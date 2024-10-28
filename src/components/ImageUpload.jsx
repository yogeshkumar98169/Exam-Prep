import React, { useState, useEffect } from "react";
import service from "../appwrite/services";
import config from "../appwrite/config";

const FileUpload = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const currentid = config.appwriteCollectionIdImages;

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const data = await service.getPosts({ collectionid: currentid });
      setPosts(data.documents || []); // Ensure it's an array
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPosts([]); // Reset posts in case of error
    }
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && image) {
      try {
        const uploadedFile = await service.uploadFile(image);
        const imageId = uploadedFile.$id;

        if (!imageId) {
          console.error("Uploaded file ID is null");
          return;
        }

        await service.createImagePost({
          title,
          collectionid: currentid,
          description,
          imageId: imageId,
        });

        setTitle("");
        setDescription("");
        setImage(null);
        fetchPosts();
      } catch (error) {
        console.error("Error uploading file or creating post", error);
      }
    }
  };

  const handleDelete = async (postId, imageId) => {
    try {
      await service.deletePost({ id: postId, collectionid: currentid });
      await service.deleteFile(imageId);
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleNext = () => {
    setCurrentPostIndex((prevIndex) => (prevIndex + 1) % (posts.length || 1)); // Prevent division by zero
  };

  const handlePrev = () => {
    setCurrentPostIndex(
      (prevIndex) => (prevIndex - 1 + (posts.length || 1)) % (posts.length || 1)
    );
  };

  const handleFullscreenToggle = () => {
    setIsFullscreen(!isFullscreen);
  };

  const currentPost = posts[currentPostIndex] || {}; // Default to an empty object

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Upload Image with Title
      </h2>

      {/* Upload Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-md mx-auto mb-8"
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="file"
          onChange={handleFileChange}
          className="p-2"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Upload
        </button>
      </form>

      {/* Preview of currently uploaded image */}
      {image && (
        <div className="mt-4">
          <h4 className="text-lg font-medium">Current Upload Preview:</h4>
          <img
            src={URL.createObjectURL(image)}
            alt="Current Upload Preview"
            className="mt-2 w-full h-full"
          />
        </div>
      )}

      {/* Display Posts */}
      <div className="flex flex-col items-center">
        <h3 className="text-xl font-semibold mb-4">Uploaded Files</h3>
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
          {currentPost.title ? (
            <>
              <h4 className="text-lg font-medium">{currentPost.title}</h4>
              <p className="text-gray-600 mb-4">{currentPost.description}</p>
              {currentPost.imageId && (
                <img
                  src={service.getFilePreview(currentPost.imageId)}
                  alt={currentPost.title}
                  onClick={handleFullscreenToggle}
                  className={`cursor-pointer transition-transform duration-300 w-full h-full `}
                />
              )}
              <div className="flex justify-between mt-6">
                <button
                  onClick={() =>
                    handleDelete(currentPost.$id, currentPost.imageId)
                  }
                  className="bg-red-500 text-white px-8 py-2 rounded-md hover:bg-red-600 transition duration-300"
                >
                  Delete
                </button>
                <button
                  onClick={handlePrev}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-300"
                >
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <p className="text-gray-500">No posts available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
