// import React, { useState } from "react";
// import { FaRegSmile, FaEllipsisH } from "react-icons/fa";
// import Picker from "emoji-picker-react";
// import emailjs from "@emailjs/browser";
// import prf from "../../../images/profileimg.png";
// import prf1 from "../../../images/profil.png";
// import cal from "../../../images/cal.png";
// import art from "../../../images/art.png";

// Dummy images for services
// import doct from "../../../images/doct1.jpg";
// import law from '../../../images/lay.jpg'
// import bank from '../../../images/bank.jpg'

// const Post = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filterOption, setFilterOption] = useState("");
//   const [posts, setPosts] = useState([]);
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(null);
//   const [postData, setPostData] = useState({
//     username: "",
//     specialist: "",
//     image: "",
//     description: "",
//     emoji: "",
//     specialId: "",
//   });

//   // Handle Post Submission
//   const handlePost = () => {
//     if (
//       postData.username &&
//       postData.specialist &&
//       (postData.image || postData.description)
//     ) {
//       const newPost = {
//         ...postData,
//         specialId: `#${postData.specialist.toLowerCase()}`,
//         timestamp: new Date().toLocaleString(),
//       };
//       setPosts([newPost, ...posts]);
//       setPostData({
//         username: "",
//         specialist: "",
//         image: "",
//         description: "",
//         emoji: "",
//         specialId: "",
//       });
//       setModalOpen(false);
//       setShowPopup(true);

//       // Hide pop-up after 3 seconds
//       setTimeout(() => setShowPopup(false), 3000);
//     }
//   };

//   // Handle Emoji Selection
//   const onEmojiClick = (emojiObject) => {
//     setPostData({ ...postData, emoji: postData.emoji + emojiObject.emoji });
//   };

//   // Filter Posts Based on Search Query or Filter
//   const filteredPosts = posts.filter(
//     (post) =>
//       (post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         post.specialId.toLowerCase().includes(searchQuery.toLowerCase())) &&
//       (filterOption === "" || post.specialId.toLowerCase() === `#${filterOption}`)
//   );

//   // Send Email on Connect
//   const handleConnect = (post) => {
//     const templateParams = {
//       to_email: "uppuraghu21@gmail.com",
//       from_name: post.username,
//       specialist: post.specialist,
//     };

//     emailjs
//       .send(
//         "service_h7log1r", // Replace with your actual service ID
//         "template_reqyq74", // Replace with your actual template ID
//         templateParams,
//         "4M9NBDeam5qtZtWYb" // Replace with your EmailJS User ID
//       )
//       .then(
//         (response) => {
//           console.log("✅ SUCCESS!", response.status, response.text);
//           alert(`✅ Connection request sent to ${post.username}`);
//         },
//         (error) => {
//           console.error("❌ FAILED...", error);
//           alert(
//             `❌ Failed to send connection request to ${post.username}. Please try again.`
//           );
//         }
//       );
//   };

//   // Delete Post
//   const handleDelete = (index) => {
//     const updatedPosts = posts.filter((_, i) => i !== index);
//     setPosts(updatedPosts);
//   };

//   return (
//     <div className="ml-70 flex flex-col justify-center -mt-35 w-300">
//       <div className="p-6 flex-10">
//         {/* Search Bar and Filter Dropdown */}
//         <div className="flex justify-center mb-16 ml-65 space-x-4">
//           <input
//             type="text"
//             placeholder="Search #doctor, #lawyer, or services..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full max-w-md p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <select
//             value={filterOption}
//             onChange={(e) => setFilterOption(e.target.value)}
//             className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">All</option>
//             <option value="doctor">Doctor</option>
//             <option value="lawyer">Lawyer</option>
//             <option value="banking">Banking</option>
//           </select>
//         </div>

//         {/* Create Post Section */}
//         <div className="bg-gray-100 p-4 rounded-lg shadow-md max-w-xl -mt-10 flex flex-col ml-105">
//           <div className="flex items-center gap-3 mb-4">
//             <img
//               src={prf1}
//               alt="Profile"
//               className="w-12 h-12 rounded-full"
//             />
//             <input
//               type="text"
//               placeholder="Start a post"
//               className="w-full p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               onClick={() => setModalOpen(true)}
//             />
//           </div>

//           {/* Action Buttons */}
//           <div className="flex justify-around">
//             <div
//               className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 p-2 rounded-lg"
//               onClick={() => setModalOpen(true)}
//             >
//               <img src={prf} alt="Media" className="w-6 h-6" />
//               <span className="text-gray-700">Media</span>
//             </div>
//             <div
//               className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 p-2 rounded-lg"
//               onClick={() => setModalOpen(true)}
//             >
//               <img src={cal} alt="Event" className="w-6 h-6" />
//               <span className="text-gray-700">Event</span>
//             </div>
//             <div
//               className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 p-2 rounded-lg"
//               onClick={() => setModalOpen(true)}
//             >
//               <img src={art} alt="Write Article" className="w-6 h-6" />
//               <span className="text-gray-700">Write article</span>
//             </div>
//           </div>
//         </div>

//         {/* Modal for Creating Post */}
//         {isModalOpen && (
//           <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg relative mx-auto -mt-40 ml-90">
//             <h1 className="text-xl font-semibold mb-4 w-160">Create a Post</h1>
//             <div className="flex items-center mb-4 space-x-4">
//               <img src={prf} alt="Profile" className="w-12 h-12 rounded-full" />
//               <input
//                 type="text"
//                 placeholder="Enter your Name"
//                 value={postData.username}
//                 onChange={(e) =>
//                   setPostData({ ...postData, username: e.target.value })
//                 }
//                 className="flex-grow p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <select
//               value={postData.specialist}
//               onChange={(e) =>
//                 setPostData({ ...postData, specialist: e.target.value })
//               }
//               className="w-full p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">Select Specialist</option>
//               <option value="Doctor">Doctor</option>
//               <option value="Lawyer">Lawyer</option>
//               <option value="Banking">Banking</option>
//             </select>

//             <textarea
//               rows="4"
//               placeholder="Add a description..."
//               value={postData.description}
//               onChange={(e) =>
//                 setPostData({ ...postData, description: e.target.value })
//               }
//               className="w-full p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />

//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) => {
//                 if (e.target.files[0]) {
//                   setPostData({
//                     ...postData,
//                     image: URL.createObjectURL(e.target.files[0]),
//                   });
//                 }
//               }}
//               className="w-full mb-3 p-3 border-2 border-dashed border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-100 transition cursor-pointer"
//             />

//             <div className="flex items-center space-x-3 mb-3 relative">
//               <FaRegSmile
//                 className="text-2xl text-gray-500 cursor-pointer"
//                 onClick={() => setShowEmojiPicker(!showEmojiPicker)}
//               />
//               <input
//                 type="text"
//                 placeholder="Add emoji"
//                 value={postData.emoji}
//                 readOnly
//                 className="flex-grow p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               {showEmojiPicker && (
//                 <div className="absolute top-12 left-0 z-10">
//                   <Picker onEmojiClick={onEmojiClick} />
//                 </div>
//               )}
//             </div>

//             <div className="flex justify-end space-x-4">
//               <button
//                 onClick={() => setModalOpen(false)}
//                 className="px-4 py-2 bg-gray-300 rounded-lg"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handlePost}
//                 className="px-4 py-2 bg-blue-500 text-white rounded-lg"
//               >
//                 Post
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Success Popup */}
//         {showPopup && (
//           <div className="fixed top-20 right-5 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
//             🎉 Post successfully created!
//           </div>
//         )}

//         {/* Post Feed */}
//         <div className="mt-8 w-145 ml-105">
//           {filteredPosts.map((post, index) => (
//             <div
//               key={index}
//               className="bg-white p-4 mb-4 rounded-lg shadow-md relative"
//             >
//               <div className="flex items-center mb-4">
//                 <img
//                   src={prf1}
//                   alt="Profile"
//                   className="w-12 h-12 rounded-full"
//                 />
//                 <div className="ml-3">
//                   <h3 className="font-semibold">{post.username}</h3>
//                   <p className="text-gray-500">{post.specialId}</p>
//                 </div>
//                 <FaEllipsisH
//                   className="ml-auto text-gray-500 cursor-pointer"
//                   onClick={() =>
//                     setShowDropdown(showDropdown === index ? null : index)
//                   }
//                 />
//                 {showDropdown === index && (
//                   <div className="absolute right-4 top-12 bg-white border rounded-lg shadow-lg">
//                     <button
//                       onClick={() => handleDelete(index)}
//                       className="block px-4 py-2 w-full text-left text-red-500 hover:bg-gray-100"
//                     >
//                       Delete Post
//                     </button>
//                   </div>
//                 )}
//               </div>

//               {post.image && (
//                 <img
//                   src={post.image}
//                   alt="Post"
//                   className="w-full rounded-lg  mb-4"
//                 />
//               )}
// <p className="text-sm text-gray-600 break-words overflow-hidden">
//   {post.description}
// </p>
//               <p className="mb-2">{post.emoji}</p>

//               <div className="flex justify-between items-center text-sm text-gray-500">
//                 <span>{post.timestamp}</span>
//                 <button
//   onClick={() => handleConnect(post)}
//   className="px-4 py-2 bg-blue-100 text-blue-500 border border-blue-300 rounded-lg hover:bg-blue-200 transition"
// >
//   Connect
// </button>

//               </div>
//             </div>
//           ))}
//           {filteredPosts.length === 0 && (
//             <p className="text-gray-500">No posts found.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Post;



import React, { useState, useEffect } from "react";
import { FaRegSmile, FaEllipsisH, FaTimes } from "react-icons/fa";
import Picker from "emoji-picker-react";
import emailjs from "@emailjs/browser";
import prf from "../../../images/profileimg.png";
import prf1 from "../../../images/profil.png";
import cal from "../../../images/cal.png";
import art from "../../../images/art.png";
import { db } from "../../../firebase/firebaseConfig";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

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

  // Fetch posts from Firestore
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "posts"));
        const postsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPosts(postsData);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to load posts. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

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
        createdAt: new Date().toISOString()
      };

      const docRef = await addDoc(collection(db, "posts"), newPost);
      
      setPosts(prevPosts => [{ id: docRef.id, ...newPost }, ...prevPosts]);
      
      setPostData({
        username: "",
        specialist: "",
        description: "",
        emoji: "",
        specialId: "",
      });
      setModalOpen(false);
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
  const onEmojiClick = (emojiObject, event) => {
    setPostData(prev => ({ 
      ...prev, 
      emoji: (prev.emoji || "") + emojiObject.emoji 
    }));
    setShowEmojiPicker(false); // Close picker after selection
  };

  // Filter Posts
  const filteredPosts = posts
    .filter(post => 
      (post.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
       post.specialId?.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (filterOption === "" || post.specialId?.toLowerCase() === `#${filterOption}`)
    )
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Send Email on Connect
  const handleConnect = (post) => {
    const templateParams = {
      to_email: "uppuraghu21@gmail.com",
      from_name: post.username,
      specialist: post.specialist,
    };

    emailjs.send(
      "service_h7log1r",
      "template_reqyq74",
      templateParams,
      "4M9NBDeam5qtZtWYb"
    ).then(
      (response) => {
        alert(`Connection request sent to ${post.username}`);
      },
      (error) => {
        alert(`Failed to send connection request to ${post.username}. Please try again.`);
      }
    );
  };

  // Delete Post
  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    
    try {
      setLoading(true);
      await deleteDoc(doc(db, "posts", postId));
      setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
      setError("Failed to delete post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ml-70 flex flex-col justify-center -mt-35 w-300">
      <div className="p-6 flex-10">
        {/* Loading Indicator */}
        {loading && (
          <div className="fixed top-20 right-5 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
            Processing...
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="fixed top-20 right-5 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
            {error}
          </div>
        )}

        {/* Success Popup */}
        {showPopup && (
          <div className="fixed top-20 right-5 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
            🎉 Post successfully created!
          </div>
        )}

        {/* Search and Filter */}
        <div className="flex justify-center mb-16 ml-65 space-x-4">
          <input
            type="text"
            placeholder="Search #doctor, #lawyer, or services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={filterOption}
            onChange={(e) => setFilterOption(e.target.value)}
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All</option>
            <option value="doctor">Doctor</option>
            <option value="lawyer">Lawyer</option>
            <option value="banking">Banking</option>
          </select>
        </div>

        {/* Create Post Section */}
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

        {/* Improved Create Post Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg relative">
              <button
                onClick={() => {
                  setModalOpen(false);
                  setShowEmojiPicker(false);
                }}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="text-xl" />
              </button>
              
              <h1 className="text-xl font-semibold mb-4">Create a Post</h1>
              
              <div className="flex items-center mb-4 space-x-4">
                <img src={prf} alt="Profile" className="w-12 h-12 rounded-full" />
                <input
                  type="text"
                  placeholder="Enter your Name"
                  value={postData.username}
                  onChange={(e) => setPostData(prev => ({ ...prev, username: e.target.value }))}
                  className="flex-grow p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <select
                value={postData.specialist}
                onChange={(e) => setPostData(prev => ({ ...prev, specialist: e.target.value }))}
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
                onChange={(e) => setPostData(prev => ({ ...prev, description: e.target.value }))}
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
                  placeholder="Click to add emoji"
                  value={postData.emoji}
                  readOnly
                  className="flex-grow p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                />
                {showEmojiPicker && (
                  <div className="absolute top-12 left-0 z-10">
                    <Picker 
                      onEmojiClick={onEmojiClick}
                      pickerStyle={{ width: '300px' }}
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

        {/* Posts Feed */}
        <div className="mt-8 w-145 ml-105">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <div key={post.id} className="bg-white p-4 mb-4 rounded-lg shadow-md relative">
                <div className="flex items-center mb-4">
                  <img src={prf1} alt="Profile" className="w-12 h-12 rounded-full" />
                  <div className="ml-3">
                    <h3 className="font-semibold">{post.username}</h3>
                    <p className="text-gray-500">{post.specialId}</p>
                  </div>
                  <button
                    onClick={() => setShowDropdown(showDropdown === post.id ? null : post.id)}
                    className="ml-auto text-gray-500 hover:text-gray-700"
                  >
                    <FaEllipsisH />
                  </button>
                  {showDropdown === post.id && (
                    <div className="absolute right-4 top-12 bg-white border rounded-lg shadow-lg z-10">
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="block px-4 py-2 w-full text-left text-red-500 hover:bg-gray-100"
                      >
                        Delete Post
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
                {posts.length === 0 ? "No posts yet. Be the first to post!" : "No matching posts found."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;