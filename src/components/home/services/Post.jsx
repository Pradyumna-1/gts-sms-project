import React, { useState, useEffect } from "react";
import { FaRegSmile, FaEllipsisH, FaTimes } from "react-icons/fa";
import Picker from "emoji-picker-react";
import emailjs from "@emailjs/browser";
import prf from "../../../images/profileimg.png";
import prf1 from "../../../images/profil.png";
import cal from "../../../images/cal.png";
import art from "../../../images/art.png";
import { db } from "../../../firebase/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { toast } from "react-toastify";

const Post = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOption, setFilterOption] = useState("");
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showDropdown, setShowDropdown] = useState(null);
  const [postData, setPostData] = useState({
    username: "",
    specialist: "",
    description: "",
    emoji: "",
    specialId: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch posts from Firestore and sort by createdAt descending
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "posts"));
        const postsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const sortedPosts = postsData.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        console.log("Fetched and sorted posts:", sortedPosts);
        setPosts(sortedPosts);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to load posts. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  // Close modal with Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isModalOpen) {
        setModalOpen(false);
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isModalOpen]);

  // Handle Post Submission
  const handlePost = async () => {
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
      const newPost = {
        username: postData.username,
        specialist: postData.specialist,
        description: postData.description,
        emoji: postData.emoji,
        specialId: `#${postData.specialist.toLowerCase()}`,
        timestamp: new Date().toLocaleString(),
        createdAt: new Date().toISOString(),
      };
      const docRef = await addDoc(collection(db, "posts"), newPost);
      setPosts((prevPosts) => {
        const updatedPosts = [{ id: docRef.id, ...newPost }, ...prevPosts];
        console.log("Updated posts after adding:", updatedPosts);
        return updatedPosts;
      });
      setPostData({
        username: "",
        specialist: "",
        description: "",
        emoji: "",
        specialId: "",
      });
      setModalOpen(false);
      toast.success("🎉 Post successfully created!");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    } catch (error) {
      console.error("Error adding post:", error);
      setError("Failed to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Improved Emoji Handling
  const onEmojiClick = (emojiObject) => {
    setPostData((prev) => ({
      ...prev,
      emoji:
        prev.emoji.length < 5 ? prev.emoji + emojiObject.emoji : prev.emoji,
    }));
    setShowEmojiPicker(false);
  };

  // Filter and sort posts (newest first)
  const filteredPosts = posts
    .filter(
      (post) =>
        (post.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.specialId?.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (filterOption === "" ||
          post.specialId?.toLowerCase() === `#${filterOption}`)
    )
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  console.log("Filtered and sorted posts:", filteredPosts);

  // Send Email on Connect
  const handleConnect = (post) => {
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
        () => {
          toast.success(`Connection request sent to ${post.username}`);
        },
        (error) => {
          toast.error(
            `Failed to send connection request to ${post.username}. Please try again.`
          );
        }
      );
  };

  // Delete Post
  const handleDelete = async (postId) => {
    toast(
      ({ closeToast }) => (
        <div>
          <p>Are you sure you want to delete this post?</p>
          <button
            onClick={async () => {
              try {
                setLoading(true);
                await deleteDoc(doc(db, "posts", postId));
                setPosts((prev) => prev.filter((post) => post.id !== postId));
                toast.success("Post deleted!");
              } catch {
                toast.error("Failed to delete post.");
              } finally {
                setLoading(false);
                closeToast();
              }
            }}
            className="bg-red-500 text-white px-3 py-2 text-sm rounded"
          >
            OK
          </button>
        </div>
      ),
      { autoClose: false, position: "top-center" }
    );
  };

  return (
    <div className="ml-70 flex flex-col justify-center -mt-35 w-300">
      <div className="p-6 flex-10">
        {/* {loading && (
          <div className="fixed top-20 right-5 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
            Processing...
          </div>
        )} */}
        {error && (
          <div className="fixed top-20 right-5 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
            {error}
          </div>
        )}
        {/* {showPopup && (
          <div className="fixed top-20 right-5 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
            🎉 Post successfully created!
          </div>
        )} */}
        <div className="flex justify-center mb-16 ml-65 space-x-4">
          <input
            type="text"
            placeholder="Search #doctor, #lawyer, or services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md p-2 border border-zinc-500 focus:blue-500 rounded-lg outline-none"
          />
          <select
            value={filterOption}
            onChange={(e) => setFilterOption(e.target.value)}
            className="p-2 border rounded-lg border-zinc-500 f focus:ring-2 focus:ring-blue-500"
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
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 p-2 rounded-lg"
              onClick={() => setModalOpen(true)}
            >
              <img src={prf} alt="Media" className="w-6 h-6" />
              <span className="text-gray-700">Media</span>
            </button>
            <button
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 p-2 rounded-lg"
              onClick={() => setModalOpen(true)}
            >
              <img src={cal} alt="Event" className="w-6 h-6" />
              <span className="text-gray-700">Event</span>
            </button>
            <button
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 p-2 rounded-lg"
              onClick={() => setModalOpen(true)}
            >
              <img src={art} alt="Write Article" className="w-6 h-6" />
              <span className="text-gray-700">Write article</span>
            </button>
          </div>
        </div>
        {isModalOpen && (
          <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 transition-opacity duration-300 ${
              isModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div
              className={`bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg relative transition-transform duration-300 ${
                isModalOpen ? "scale-100" : "scale-95"
              }`}
            >
              <button
                onClick={() => {
                  setModalOpen(false);
                  setShowEmojiPicker(false);
                }}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="text-xl" />
              </button>
              <h1 id="modal-title" className="text-xl font-semibold mb-4">
                Create a Post
              </h1>
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
                    onClick={() => setPostData((prev) => ({ ...prev, emoji: "" }))}
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
                  onClick={() => {
                    setModalOpen(false);
                    setShowEmojiPicker(false);
                  }}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
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
                    onClick={() =>
                      setShowDropdown(showDropdown === post.id ? null : post.id)
                    }
                    className="ml-auto text-gray-500 hover:text-gray-700"
                  >
                    <FaEllipsisH />
                  </button>
                  {showDropdown === post.id && (
                    <div className="absolute right-4 top-12 bg-white border rounded-md border-zinc-700 shadow-lg z-10">
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="block px-3 py-1 w-full text-left text-red-500 cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-600 break-words mb-2">
                  {post.description}
                </p>
                {post.emoji && <p className="text-2xl mb-2">{post.emoji}</p>}
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{post.timestamp}</span>
                  <button
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