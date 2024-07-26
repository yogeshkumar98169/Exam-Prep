import React, { useEffect, useState } from "react";
import service from "../appwrite/services";
import config from "../appwrite/config";
import { MdDelete } from "react-icons/md";

export default function Vocab() {
  const [title, setTitle] = useState("");
  const [send, setSend] = useState(true);
  const [allPosts, setAllPosts] = useState(null);
  const collectionid = config.appwriteCollectionIdVocab;

  const handleChange = (e) => {
    setTitle(e.target.value);
    // console.log(title);
  };

  const handleClick = async () => {
    setSend(false);
    const dbPost = await service.createPost({ title, collectionid });
    setSend(true);
    // console.log(dbPost);
    setTitle(" ");
  };

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
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl font-serif font-bold my-3 text-center">Vocab</h1>
      <main className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <input
            type="text"
            onChange={handleChange}
            value={title}
            className="p-2 outline-none rounded-lg w-72 max-w-72"
          />
          <button
            onClick={handleClick}
            className="p-2 bg-blue-600 rounded-lg text-[rgb(225,219,219)]"
          >
            {" "}
            {send ? "Save" : "Saving..."}
          </button>
        </div>

        <div className="bg-[#6c6b6b] flex flex-col gap-3 p-2 rounded-sm">
          {allPosts
            ? allPosts.map((e) => (
                <div
                  key={e.$id}
                  id={e.$id}
                  className="bg-white rounded-lg p-2 box-border"
                >
                  <p className="relative">
                    {e.title}
                    <button onClick={handleDel} className="absolute right-0 top-1">
                      <MdDelete />
                    </button>
                  </p>
                </div>
              ))
            : "null"}
        </div>
      </main>
    </div>
  );
}
