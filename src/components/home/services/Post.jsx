import React, { useState, useEffect } from "react";
import { FaRegSmile, FaEllipsisH, FaTimes } from "react-icons/fa";
import Picker from "emoji-picker-react";
import emailjs from "@emailjs/browser";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import prf from "../../../images/profileimg.png";
import prf1 from "../../../images/profil.png";
import cal from "../../../images/cal.png";
import art from "../../../images/art.png";
import { toast } from "react-toastify";

const Post = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOption, setFilterOption] = useState("");
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showDropdown, setShowDropdown] = useState(null);
  const [postData, setPostData] = useState({
    username: "", // Start with empty username
    specialist: "",
    description: "",
    emoji: "",
    imageFile: null,
    imagePreview: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        setError("Please log in to access this feature.");
      }
      // Removed automatic username setting here
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/posts");
        if (!response.ok) throw new Error("Failed to fetch posts");
        const postsData = await response.json();
        setPosts(postsData);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to load posts. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size must be less than 5MB");
        return;
      }
      if (!file.type.startsWith("image/")) {
        setError("Please upload an image file");
        return;
      }
      setPostData((prev) => ({
        ...prev,
        imageFile: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const handlePost = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("handlePost called");

    if (!user) {
      setError("Please log in to create a post.");
      return;
    }

    setError(null);

    if (!postData.username || !postData.specialist) {
      setError("Please enter your name and select a specialist");
      return;
    }

    if (!postData.description) {
      setError("Please add a description");
      return;
    }

    try {
      setLoading(true);
      console.log("Sending POST request...");

      const formData = new FormData();
      formData.append("username", postData.username);
      formData.append("specialist", postData.specialist);
      formData.append("description", postData.description);
      formData.append("emoji", postData.emoji);
      if (postData.imageFile) {
        formData.append("image", postData.imageFile);
      }

      const response = await fetch("http://localhost:5000/post/submit", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      console.log("Post Response Status:", response.status);
      console.log("Post Response Headers:", [...response.headers]);

      if (response.status >= 300 && response.status < 400) {
        console.error("Redirect detected:", response.status, response.url);
        throw new Error("Server attempted a redirect, which is not allowed.");
      }

      const result = await response.json();
      console.log("Post Response Body:", result);

      if (!response.ok) {
        throw new Error(result.message || "Failed to submit post");
      }

      setPosts((prevPosts) => [result.post, ...prevPosts]);
      setPostData({
        username: "", // Reset to empty after posting
        specialist: "",
        description: "",
        emoji: "",
        imageFile: null,
        imagePreview: null,
      });
      setModalOpen(false);
      console.log("Showing success toast...");
      toast.success("🎉 Post successfully created!", { autoClose: 10000 });
    } catch (error) {
      console.error("Error adding post:", error.message);
      setError(error.message || "Failed to create post. Please try again.");
      toast.error(error.message || "Failed to create post.", {
        autoClose: 10000,
      });
    } finally {
      setLoading(false);
      console.log("handlePost completed");
    }
  };

  const onEmojiClick = (emojiObject) => {
    setPostData((prev) => ({
      ...prev,
      emoji: (prev.emoji || "") + emojiObject.emoji,
    }));
    setShowEmojiPicker(false);
  };

  const filteredPosts = posts
    .filter(
      (post) =>
        (post.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.specialId?.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (filterOption === "" ||
          post.specialId?.toLowerCase() === `#${filterOption}`)
    )
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const handleConnect = (post) => {
    if (!user) {
      setError("Please log in to connect.");
      return;
    }

    const templateParams = {
      to_email: "uppuraghu21@gmail.com",
      from_name: post.username,
      specialist: post.specialist,
    };

    emailjs
      .send(
        "service_h7log1r",
        "template_reqyq74",
        templateParams,
        "4M9NBDeam5qtZtWYb"
      )
      .then(
        () => toast.success(`Connection request sent to ${post.username}`),
        () =>
          toast.warning(
            `Failed to send connection request to ${post.username}. Please try again.`
          )
      );
  };

  const handleDelete = async (postId) => {
    if (!user) {
      setError("Please log in to delete a post.");
      return;
    }

    toast(
      ({ closeToast }) => (
        <div>
          <p>Are you sure you want to delete this post?</p>
          <div className="flex justify-end space-x-2 mt-2">
            <button
              onClick={async (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log("Delete Yes clicked");

                try {
                  setLoading(true);
                  console.log("Sending DELETE request...");
                  const response = await fetch(
                    `http://localhost:5000/post/${postId}`,
                    {
                      method: "DELETE",
                      credentials: "include",
                    }
                  );

                  console.log("Delete Response Status:", response.status);
                  console.log("Delete Response Headers:", [
                    ...response.headers,
                  ]);

                  if (response.status >= 300 && response.status < 400) {
                    console.error(
                      "Redirect detected:",
                      response.status,
                      response.url
                    );
                    throw new Error(
                      "Server attempted a redirect, which is not allowed."
                    );
                  }

                  if (!response.ok) throw new Error("Failed to delete post");

                  setPosts((prevPosts) =>
                    prevPosts.filter((post) => post.id !== postId)
                  );
                  console.log("Showing delete success toast...");
                  toast.success("Post deleted successfully!", {
                    autoClose: 10000,
                  });
                } catch (error) {
                  console.error("Error deleting post:", error);
                  setError("Failed to delete post. Please try again.");
                  toast.error("Failed to delete post.", { autoClose: 10000 });
                } finally {
                  setLoading(false);
                  closeToast();
                  console.log("handleDelete completed");
                }
              }}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              type="button"
            >
              Yes
            </button>
            <button
              onClick={() => closeToast()}
              className="px-3 py-1 bg-gray-300 text-black rounded hover:bg-gray-400"
              type="button"
            >
              No
            </button>
          </div>
        </div>
      ),
      { autoClose: false, position: "top-center" }
    );
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Please log in to access this feature.</p>
      </div>
    );
  }

  return (
    <div className="ml-70 flex flex-col justify-center -mt-35 w-300">
      <div className="p-6 flex-10">
        {error && (
          <div className="fixed top-20 right-5 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
            {error}
          </div>
        )}

        <div className="flex justify-center mb-16 ml-65 space-x-4">
          <input
            type="text"
            placeholder="Search #doctor, #lawyer, or services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md p-2 border rounded-lg border-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={filterOption}
            onChange={(e) => setFilterOption(e.target.value)}
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-zinc-500"
          >
            <option value="">All</option>
            <option value="doctor">Doctor</option>
            <option value="lawyer">Lawyer</option>
            <option value="banking">Banking</option>
          </select>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow-md max-w-xl -mt-10 flex flex-col ml-105">
          <div className="flex items-center gap-3 mb-4">
            <img src={prf1} alt="Profile" className="w-12 h-12 rounded-full" />
            <input
              type="text"
              placeholder="Start a post"
              className="w-full p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setModalOpen(true)}
              readOnly
            />
          </div>
          <div className="flex justify-around">
            <button
              type="button"
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 p-2 rounded-lg"
              onClick={() => setModalOpen(true)}
            >
              <img src={prf} alt="Media" className="w-6 h-6" />
              <span className="text-gray-700">Media</span>
            </button>
            <button
              type="button"
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 p-2 rounded-lg"
              onClick={() => setModalOpen(true)}
            >
              <img src={cal} alt="Event" className="w-6 h-6" />
              <span className="text-gray-700">Event</span>
            </button>
            <button
              type="button"
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 p-2 rounded-lg"
              onClick={() => setModalOpen(true)}
            >
              <img src={art} alt="Write Article" className="w-6 h-6" />
              <span className="text-gray-700">Write article</span>
            </button>
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg relative">
              <button
                type="button"
                onClick={() => {
                  setModalOpen(false);
                  setShowEmojiPicker(false);
                  setPostData((prev) => ({
                    ...prev,
                    imageFile: null,
                    imagePreview: null,
                  }));
                }}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="text-xl" />
              </button>

              <h1 className="text-xl font-semibold mb-4">Create a Post</h1>

              <div className="flex items-center mb-4 space-x-4">
                <img
                  src={prf}
                  alt="Profile"
                  className="w-12 h-12 rounded-full"
                />
                <input
                  type="text"
                  placeholder="Enter your Name"
                  value={postData.username}
                  onChange={(e) =>
                    setPostData((prev) => ({
                      ...prev,
                      username: e.target.value,
                    }))
                  }
                  className="flex-grow p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <select
                value={postData.specialist}
                onChange={(e) =>
                  setPostData((prev) => ({
                    ...prev,
                    specialist: e.target.value,
                  }))
                }
                className="w-full p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Specialist</option>
                <option value="Doctor">Doctor</option>
                <option value="Lawyer">Lawyer</option>
                <option value="Banking">Banking</option>
              </select>

              <textarea
                rows="4"
                placeholder="Add a description..."
                value={postData.description}
                onChange={(e) =>
                  setPostData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="w-full p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="mb-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-2 border rounded-lg"
                />
                {postData.imagePreview && (
                  <div className="mt-2 relative">
                    <img
                      src={postData.imagePreview}
                      alt="Preview"
                      className="max-h-40 rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setPostData((prev) => ({
                          ...prev,
                          imageFile: null,
                          imagePreview: null,
                        }))
                      }
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                    >
                      <FaTimes />
                    </button>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-3 mb-3 relative">
                <button
                  type="button"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaRegSmile className="text-2xl" />
                </button>
                <input
                  type="text"
                  placeholder="Click to add emoji (max 5)"
                  value={postData.emoji}
                  readOnly
                  className="flex-grow p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                />
                {postData.emoji && (
                  <button
                    type="button"
                    onClick={() =>
                      setPostData((prev) => ({ ...prev, emoji: "" }))
                    }
                    className="text-gray-500 hover:text-red-500"
                  >
                    <FaTimes className="text-xl" />
                  </button>
                )}
                {showEmojiPicker && (
                  <div className="absolute top-[-350px] left-0 z-10 max-h-[300px] overflow-y-auto">
                    <Picker
                      onEmojiClick={onEmojiClick}
                      pickerStyle={{ width: "300px" }}
                    />
                  </div>
                )}
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setModalOpen(false);
                    setShowEmojiPicker(false);
                    setPostData((prev) => ({
                      ...prev,
                      imageFile: null,
                      imagePreview: null,
                    }));
                  }}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handlePost}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  disabled={loading}
                >
                  {loading ? "Posting..." : "Post"}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 w-145 ml-105">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white p-4 mb-4 rounded-lg shadow-md relative"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={prf1}
                    alt="Profile"
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="ml-3">
                    <h3 className="font-semibold">{post.username}</h3>
                    <p className="text-gray-500">{post.specialId}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setShowDropdown(showDropdown === post.id ? null : post.id)
                    }
                    className="ml-auto text-gray-500 hover:text-gray-700"
                  >
                    <FaEllipsisH />
                  </button>
                  {showDropdown === post.id && (
                    <div className="absolute bg-white right-4 top-12 border rounded-lg shadow-lg z-10">
                      <button
                        type="button"
                        onClick={() => handleDelete(post.id)}
                        className="block px-4 py-2 w-full text-left text-red-500 hover:bg-gray-100 rounded-md"
                      >
                        Delete Post
                      </button>
                    </div>
                  )}
                </div>

                <p className="text-sm text-gray-600 break-words mb-2">
                  {post.description}
                </p>
                {post.imageUrl && (
                  <img
                    src={`http://localhost:5000${post.imageUrl}`}
                    alt="Post content"
                    className="w-full h-auto rounded-lg mb-2"
                  />
                )}
                {post.emoji && <p className="text-2xl mb-2">{post.emoji}</p>}

                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{post.timestamp}</span>
                  <button
                    type="button"
                    onClick={() => handleConnect(post)}
                    className="px-4 py-2 bg-blue-100 text-blue-500 border border-blue-300 rounded-lg hover:bg-blue-200 transition"
                  >
                    Connect
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white p-4 rounded-lg shadow-md text-center">
              <p className="text-gray-500">
                {posts.length === 0
                  ? "No posts yet. Be the first to post!"
                  : "No matching posts found."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;