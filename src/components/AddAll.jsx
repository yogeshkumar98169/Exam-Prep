import React, { useEffect, useState } from "react";
import service from "../appwrite/services";
import config from "../appwrite/config";
import { MdDelete, MdEdit } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style/scrollbar.css";

export default function MultiCollection() {
  const [collectionid, setCollectionid] = useState("");
  const [send, setSend] = useState(true);
  const [allPosts, setAllPosts] = useState([]);
  const [dataArray, setDataArray] = useState([]); // Array of 500 elements

  const handleClick = async () => {
    if (!collectionid || dataArray.length === 0) return;

    setSend(false); // Disable the button while processing

    try {
      // Loop through the dataArray and insert each post after checking if it exists
      for (let data of dataArray) {
        // Check if a post with the same title already exists in the collection
        const existingPosts = await service.getPosts({
          collectionid,
        });

        const exists = existingPosts.documents.some(
          (post) => post.title.toLowerCase() === data.title.toLowerCase()
        );

        if (exists) {
          console.log(
            `Post titled "${data.title}" already exists. Skipping...`
          );
          continue; // Skip to the next item if the title exists
        }

        // If the title doesn't exist, create the post
        await service.createPost({
          title: data.title, // Assuming your array has title and description
          description: data.description || "",
          collectionid,
        });
      }

      toast.success("Posts created successfully, duplicates skipped.");
      // Optionally refresh the list after posting
      getAll();
    } catch (error) {
      console.error("Error creating posts:", error);
      toast.error("Failed to create some or all posts.");
    } finally {
      setSend(true); // Re-enable the button after completion
    }
  };


  const handleChangeCollection = (e) => {
    setCollectionid(e.target.value);
    setAllPosts([]);
  };

  const getAll = async () => {
    try {
      const post = await service.getPosts({ collectionid });
      const sortedPosts = post.documents.sort((a, b) =>
        a.title.localeCompare(b.title)
      );

      setAllPosts(sortedPosts);
    //   setAllPosts(post.documents);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  useEffect(() => {
    if (collectionid) {
      getAll();
    }
  }, [collectionid]);
  const sampleDataArray = [
  
  ]; 

  useEffect(() => {
    setDataArray(sampleDataArray); // Set the array once you have the data
  }, []);


  return (
    <div className="flex flex-col gap-6 p-8 w-[400px] mt-2 mx-auto bg-gray-900 text-gray-100 rounded-lg shadow-lg h-full">
      <ToastContainer />
      <h1 className="text-4xl font-semibold text-center text-gray-100">
        Multi-Collection
      </h1>
      <div className="flex flex-col gap-4">
        <select
          name="collectionid"
          id="collectionid"
          onChange={handleChangeCollection}
          value={collectionid}
          className="p-4 border border-gray-700 bg-gray-800 text-gray-100 rounded-lg w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        >
          <option value="">Select Collection</option>
          <option value={config.appwriteCollectionIdVocab}>Vocab</option>
          <option value={config.appwriteCollectionIdCurrent}>
            Current Affairs
          </option>
          <option value={config.appwriteCollectionIdIdioms}>Idioms</option>
          <option value={config.appwriteCollectionIdIdioms2500}>Idioms 2500</option>
          <option value={config.appwriteCollectionIdOneWord}>One Word</option>
        </select>

        <button
          onClick={handleClick}
          className="bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-800 disabled:bg-gray-600 transition-colors duration-300"
          disabled={!send || !collectionid || dataArray.length === 0}
        >
          {send ? "Add All Posts" : "Adding..."}
        </button>
      </div>

      {/* Display posts */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-md overflow-y-auto h-[500px] scrollbar-custom">
        <div className="text-gray-100 pb-2">Total : {allPosts.length}</div>
        {allPosts.length > 0 ? (
          allPosts.map((post) => (
            <div
              key={post.$id}
              className="bg-gray-700 rounded-lg p-4 shadow-sm mb-4"
            >
              <h3 className="text-lg font-bold text-gray-100">{post.title}</h3>
              <pre className="text-gray-400 whitespace-pre-wrap">
                {post.description}
              </pre>
              <p className="text-gray-500 text-sm">
                Last updated: {new Date(post.$updatedAt).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center">No posts available.</p>
        )}
      </div>
    </div>
  );
}
