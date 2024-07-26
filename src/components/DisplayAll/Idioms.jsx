import React, { useEffect, useState } from "react";
import service from "../../appwrite/services";
import config from "../../appwrite/config";
import { MdDelete } from "react-icons/md";

export default function IdiomsAll() {
  const [allPosts, setAllPosts] = useState(null);
  const collectionid = config.appwriteCollectionIdIdioms;

  const handleDel = async (e) => {
    const id =
      e.target.parentElement.parentElement.parentElement.parentElement.getAttribute(
        "id"
      );
    const delPost = await service.deletePost({ id, collectionid });
    delPost ? console.log("Post deleted") : console.log("Error deleting post");
    // console.log(delPost);
  };

  const getAll = async () => {
    const post = await service.getPosts({ collectionid });
    setAllPosts(post.documents);
  };
  useEffect(() => {
    getAll();
  });
  return (
    <div>
      <div className="bg-[#6c6b6b] flex flex-row flex-wrap gap-3 p-2 justify-evenly rounded-sm w-screen">
        {allPosts
          ? allPosts.map((e) => (
              <div
                key={e.$id}
                id={e.$id}
                className="bg-white rounded-lg p-2 box-border w-[300px]"
              >
                <p className="relative">
                  {e.title}
                  <button
                    onClick={handleDel}
                    className="absolute right-0 top-1"
                  >
                    <MdDelete />
                  </button>
                </p>
              </div>
            ))
          : "null"}
      </div>
    </div>
  );
}
