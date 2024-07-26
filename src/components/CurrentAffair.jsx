import React, { useEffect, useState } from "react";
import service from "../appwrite/services";
import config from "../appwrite/config";
import { MdDelete } from "react-icons/md";

export default function CurrentAffair() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [send, setSend] = useState(true);
  const [allPosts, setAllPosts] = useState(null);
  const [error,setError]=useState("")
  const collectionid = config.appwriteCollectionIdCurrent;

  const handleChange = (e) => {
    setTitle(e.target.value);
    console.log(title);
  };

  const handleDescriptonChange=(e)=>{
    setDescription(e.target.value)
  }

  const handleClick = async () => {
    setError("");
    if(title.trim()===""){  
      setError("Enter title first")
      return;
    }
    setSend(false);
    const dbPost = await service.createPost({ title, collectionid,description });
    setSend(true);
    console.log(dbPost);
    setTitle(" ");
    setDescription(" ");
  };

  const handleDel = async (e) => {
    const id =
      e.target.parentElement.parentElement.parentElement.parentElement.getAttribute(
        "id"
      );
    const delPost = await service.deletePost({ id, collectionid });
    console.log("Post Deleted");
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
      <h1 className="text-2xl font-serif font-bold my-3 text-center">
        One Word
      </h1>
      <main className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <p className="text-[#b20404] text-2xl font-bold">{error}</p>
          <input
            type="text"
            onChange={handleChange}
            value={title}
            className="p-2 outline-none rounded-lg w-72 max-w-72"
          />
          <textarea
            onChange={handleDescriptonChange}
            value={description}
            className="p-2 outline-none rounded-lg w-72 max-w-72"
          ></textarea>
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
                  <div className="relative">
                    <div className="flex flex-col gap-3">
                      <p >Title : {e.title}</p>
                      <p>Descriptoin : {e.description}</p>
                    </div>
                    <button
                      onClick={handleDel}
                      className="absolute right-0 top-1"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              ))
            : "null"}
        </div>
      </main>
    </div>
  );
}
