import React, { useEffect, useState } from "react";
import service from "../appwrite/services";
import config from "../appwrite/config";
import { MdDelete, MdEdit } from "react-icons/md";

export default function OneWord() {
  const [title, setTitle] = useState("");
  const [send, setSend] = useState(true);
  const [allPosts, setAllPosts] = useState([]);
  const [editPostId, setEditPostId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const collectionid = config.appwriteCollectionIdOneWord;

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleClick = async () => {
    if (!title.trim()) return; // Prevent empty title submission
    setSend(false);
    try {
      await service.createPost({ title, collectionid });
      setTitle("");
      getAll(); // Refresh the list
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setSend(true);
    }
  };

  const handleDel = async (id) => {
    try {
      await service.deletePost({ id, collectionid });
      getAll(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleEdit = (id, currentTitle) => {
    setEditPostId(id);
    setEditTitle(currentTitle);
  };

  const handleUpdate = async () => {
    if (!editTitle.trim()) return; // Prevent empty title update
    try {
      await service.updatePost(editPostId, { title: editTitle, collectionid });
      setEditPostId(null);
      setEditTitle("");
      getAll(); // Refresh the list after update
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const getAll = async () => {
    try {
      const post = await service.getPosts({ collectionid });
      setAllPosts(post.documents);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleClick();
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <div className="flex flex-col gap-6 p-8 w-[320px] mt-2 mx-auto bg-gray-900 text-gray-100 rounded-lg shadow-lg h-full">
      <h1 className="text-4xl font-semibold text-center text-gray-100">
        One Word
      </h1>
      <main className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 items-center">
          <input
            type="text"
            onChange={handleChange}
            value={title}
            onKeyDown={handleKeyDown}
            className="p-4 border border-gray-700 bg-gray-800 text-gray-100 rounded-lg w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Enter a new word"
          />
          <button
            onClick={handleClick}
            className="bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-800 disabled:bg-gray-600 transition-colors duration-300"
            disabled={!send}
          >
            {send ? "Save" : "Saving..."}
          </button>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg shadow-md overflow-y-auto h-[500px]">
          {allPosts.length > 0 ? (
            allPosts.map((e) => (
              <div
                key={e.$id}
                id={e.$id}
                className="bg-gray-700 rounded-lg p-4 shadow-sm mb-4 relative"
              >
                {editPostId === e.$id ? (
                  <div className="flex flex-col gap-4">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="p-3 border border-gray-600 bg-gray-700 text-gray-100 rounded-lg"
                      placeholder="Edit title"
                    />
                    <button
                      onClick={handleUpdate}
                      className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition-colors duration-300"
                    >
                      Update
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-100 text-lg">{e.title}</p>
                    <div className="absolute top-2 right-2 flex gap-2">
                      <button
                        onClick={() => handleEdit(e.$id, e.title)}
                        className="text-blue-400 hover:text-blue-500 transition-colors duration-300"
                        aria-label="Edit"
                      >
                        <MdEdit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDel(e.$id)}
                        className="text-red-400 hover:text-red-500 transition-colors duration-300"
                        aria-label="Delete"
                      >
                        <MdDelete className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center">No posts available.</p>
          )}
        </div>
      </main>
    </div>
  );
}
