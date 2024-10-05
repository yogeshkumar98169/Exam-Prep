import React, { useEffect, useState } from "react";
import service from "../appwrite/services";
import config from "../appwrite/config";
import { MdDelete, MdEdit } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style/scrollbar.css";

export default function MultiCollection() {
  const [collectionid, setCollectionid] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [send, setSend] = useState(true);
  const [allPosts, setAllPosts] = useState([]);
  const [editPostId, setEditPostId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [heading, setHeading] = useState("Multi-Collection");
  const [searchTerm, setSearchTerm] = useState(""); // New state for search term

  const currentid = config.appwriteCollectionIdCurrent;
  const idiomsid = config.appwriteCollectionIdIdioms;
  const idioms2500id=config.appwriteCollectionIdIdioms2500
  const onewordid = config.appwriteCollectionIdOneWord;
  const vocabid = config.appwriteCollectionIdVocab;

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleClick = async () => {
    if (!title.trim() || !collectionid) return;
    setSend(false);
    try {
      await service.createPost({ title, description, collectionid });
      setTitle("");
      setDescription("");
      getAll();
      toast.success("Post created successfully!");
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Failed to create post.");
    } finally {
      setSend(true);
    }
  };

  const handleDel = async (id) => {
    try {
      await service.deletePost({ id, collectionid });
      getAll();
      toast.success("Post deleted successfully!");
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete post.");
    }
  };

  const handleEdit = (id, currentTitle, currentDescription) => {
    setEditPostId(id);
    setEditTitle(currentTitle);
    setEditDescription(currentDescription);
  };

  const handleUpdate = async () => {
    if (!editTitle.trim()) return;
    try {
      await service.updatePost(editPostId, {
        title: editTitle,
        collectionid,
        description: editDescription,
      });
      setEditPostId(null);
      setEditTitle("");
      setEditDescription("");
      getAll();
      toast.success("Post updated successfully!");
    } catch (error) {
      console.error("Error updating post:", error);
      toast.error("Failed to update post.");
    }
  };

  const getAll = async () => {
    try {
      const post = await service.getPosts({ collectionid });
      setAllPosts(post.documents);
    } catch (error) {
      toast.error("Failed to fetch posts.");
      console.error("Failed to fetch posts:", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleClick();
    }
  };

  const handleChangeCollection = (e) => {
    setCollectionid(e.target.value);
    setTitle("");
    setDescription("");
    setAllPosts([]);
  };

  useEffect(() => {
    if (collectionid) {
      getAll();
    }

    switch (collectionid) {
      case vocabid:
        setHeading("Vocabulary");
        break;
      case currentid:
        setHeading("Current Affairs");
        break;
      case idiomsid:
        setHeading("Idioms");
        break;
      case idioms2500id:
        setHeading("Idioms 2500")
      case onewordid:
        setHeading("One Word");
        break;
      default:
        setHeading("Multi-Collection");
    }
  }, [collectionid]);

  // Function to highlight the search term
  const highlightText = (text) => {
    if(!text) return "";
    if (!searchTerm.trim()) return text;

    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
  };

  const filteredPosts = allPosts.filter(
    (post) =>
      post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div className="flex flex-col gap-6 p-8 w-[400px] mt-2 mx-auto bg-gray-900 text-gray-100 rounded-lg shadow-lg h-full">
      <ToastContainer />
      <h1 className="text-4xl font-semibold text-center text-gray-100">
        {heading}
      </h1>

      <div className="flex flex-col gap-4">
        {/* Search Input Field */}
        <input
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          className="p-4 border border-gray-700 bg-gray-800 text-gray-100 rounded-lg w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          placeholder="Search posts..."
        />
        <select
          name="collectionid"
          id="collectionid"
          onChange={handleChangeCollection}
          value={collectionid}
          className="p-4 border border-gray-700 bg-gray-800 text-gray-100 rounded-lg w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        >
          <option value="">Select Collection</option>
          <option value={vocabid}>Vocab</option>
          <option value={currentid}>Current Affairs</option>
          <option value={idiomsid}>Idioms</option>
          <option value={idioms2500id}>Idioms 2500</option>
          <option value={onewordid}>One Word</option>
        </select>

        <input
          type="text"
          onChange={handleChangeTitle}
          value={title}
          onKeyDown={handleKeyDown}
          className="p-4 border border-gray-700 bg-gray-800 text-gray-100 rounded-lg w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          placeholder="Enter a title"
        />
        <textarea
          onChange={handleChangeDescription}
          value={description}
          onKeyDown={handleKeyDown}
          className="p-4 border border-gray-700 bg-gray-800 text-gray-100 rounded-lg w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          placeholder="Enter a description"
          rows={3}
        />
        <button
          onClick={handleClick}
          className="bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-800 disabled:bg-gray-600 transition-colors duration-300"
          disabled={!send || !title.trim() || !collectionid}
        >
          {send ? "Save" : "Saving..."}
        </button>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg shadow-md overflow-y-auto h-[500px] scrollbar-custom">
        <div className="text-gray-100 pb-2">Total : {filteredPosts.length}</div>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div
              key={post.$id}
              className="bg-gray-700 rounded-lg p-4 shadow-sm mb-4 relative"
            >
              {editPostId === post.$id ? (
                <div className="flex flex-col gap-4">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="p-3 border border-gray-600 bg-gray-700 text-gray-100 rounded-lg"
                    placeholder="Edit title"
                  />
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="p-3 border border-gray-600 bg-gray-700 text-gray-100 rounded-lg"
                    placeholder="Edit description"
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
                  <h3
                    className="text-lg font-bold text-gray-100"
                    dangerouslySetInnerHTML={{
                      __html: highlightText(post.title),
                    }}
                  />
                  <pre
                    className="text-gray-400 whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{
                      __html: highlightText(post.description),
                    }}
                  />
                  <p className="text-gray-500 text-sm">
                    Last updated: {new Date(post.$updatedAt).toLocaleString()}
                  </p>
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      onClick={() =>
                        handleEdit(post.$id, post.title, post.description)
                      }
                      className="text-blue-400 hover:text-blue-500 transition-colors duration-300"
                      aria-label="Edit"
                    >
                      <MdEdit className="w-5 h-5" />
                    </button>
                    {/* <button
                      onClick={() => handleDel(post.$id)}
                      className="text-red-400 hover:text-red-500 transition-colors duration-300"
                      aria-label="Delete"
                    >
                      <MdDelete className="w-5 h-5" />
                    </button> */}
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center">No posts available.</p>
        )}
      </div>
    </div>
  );
}
