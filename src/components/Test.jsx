import React, { useEffect, useState } from "react";
import config from "../appwrite/config.js";
import service from "../appwrite/services.js";

export default function Test() {
  const [collectionid, setCollectionid] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentid = config.appwriteCollectionIdCurrent;
  const idiomsid = config.appwriteCollectionIdIdioms;
  const onewordid = config.appwriteCollectionIdOneWord;
  const vocabid = config.appwriteCollectionIdVocab;

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    setCollectionid(selectedValue);
    setCurrentIndex(0); // Reset index when collection changes
  };

  const handleDel = (id) => {
    // Implement delete functionality here
    console.log("Delete post with id:", id);
    // Example: service.deletePost(id).then(() => getAll());
  };

  const getAll = async () => {
    try {
      const post = await service.getPosts({ collectionid });
      setAllPosts(post.documents); // Ensure it's an array
      console.log(post.documents.length);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  useEffect(() => {
    if (collectionid) {
      getAll();
    }
  }, [collectionid]);

  const handleNext = () => {
    if (currentIndex < allPosts.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-gray-50 p-6">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200">
        <div className="p-6 bg-blue-100">
          <label
            htmlFor="options"
            className="block text-blue-800 text-lg font-semibold mb-4"
          >
            Select an Option:
          </label>
          <select
            name="collectionid"
            id="collectionid"
            onChange={handleChange}
            value={collectionid}
            className="block w-full px-4 py-2 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select</option>
            <option value={vocabid}>Vocab</option>
            <option value={currentid}>Current Affairs</option>
            <option value={idiomsid}>Idioms</option>
            <option value={onewordid}>One Word</option>
          </select>
        </div>
        <div className="p-6 bg-gray-50">
          {allPosts.length > 0 ? (
            <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {allPosts[currentIndex]?.title}
              </h2>
              <p className="text-gray-600">{allPosts[currentIndex]?.body}</p>
            </div>
          ) : (
            <p className="text-gray-600">No posts available.</p>
          )}
        </div>
        <div className="flex justify-between p-6 bg-blue-100 border-t border-blue-300">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-blue-300 transition-colors duration-200"
          >
            Prev
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === allPosts.length - 1}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 disabled:bg-green-300 transition-colors duration-200"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
