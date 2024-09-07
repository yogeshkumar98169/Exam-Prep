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
    console.log("Delete post with id:", id);
  };

  const getAll = async () => {
    try {
      const post = await service.getPosts({ collectionid });
      setAllPosts(post.documents);
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
    <div className="flex justify-center items-center min-h-screen w-full bg-gray-900 p-6">
      <div className="w-full max-w-lg bg-gray-800 shadow-lg rounded-lg overflow-hidden border border-gray-700">
        <div className="p-6 bg-gray-800">
          <label
            htmlFor="options"
            className="block text-gray-300 text-lg font-medium mb-4"
          >
            Select an Option:
          </label>
          <select
            name="collectionid"
            id="collectionid"
            onChange={handleChange}
            value={collectionid}
            className="block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-gray-300"
          >
            <option value="">Select</option>
            <option value={vocabid}>Vocab</option>
            <option value={currentid}>Current Affairs</option>
            <option value={idiomsid}>Idioms</option>
            <option value={onewordid}>One Word</option>
          </select>
        </div>
        <div className="p-6 bg-gray-900">
          {allPosts.length > 0 ? (
            <div className="bg-gray-800 rounded-lg shadow-md p-4 border border-gray-700">
              <h2 className="text-2xl font-semibold text-gray-100 mb-2">
                {allPosts[currentIndex]?.title}
              </h2>
              <p className="text-gray-400">{allPosts[currentIndex]?.body}</p>
            </div>
          ) : (
            <p className="text-gray-400 text-center">No posts available.</p>
          )}
        </div>
        <div className="flex justify-between p-6 bg-gray-800 border-t border-gray-700">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 disabled:bg-gray-600 transition-colors duration-200"
          >
            Prev
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === allPosts.length - 1}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 disabled:bg-blue-500 transition-colors duration-200"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
