import { React, useState, useEffect } from "react";
import axios from "axios";

const client = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/posts",
});
const Help = () => {
  const [userId, setUserId] = useState("");
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPost = async () => {
      let response = await client.get("?_limit=10");
      setPosts(response.data);
    };
    fetchPost();
  }, []);

  const addPosts = (title, body, id, userId) => {
    client
      .post("", {
        title: title,
        body: body,
        id: id,
        userId: userId,
      })
      .then((response) => {
        setPosts([response.data, ...posts]);
        setTitle("");
        setBody("");
        setId("");
        setUserId("");
      });
  };

  const post = (e) => {
    e.preventDefault();
    addPosts(title, body, id, userId);
  };
  return (
    <div className="w3-container W3-row">
      <div className="w3-container w3-blue">
        <h3 className="w3-center">Media</h3>
      </div>
      <div className="w3-container w3-card-4">
        <div className="w3-container w3-quarter"></div>
        <div className="w3-container w3-half">
          <form id="paymentForm">
            <div className="form-group">
              <label htmlFor="userId">User Id</label>
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w3-input"
                id="userId"
              />
            </div>
            <div className="form-group">
              <label htmlFor="id">Id</label>
              <input
                type="tel"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="w3-input"
                id="id"
              />
            </div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w3-input"
                id="title"
              />
            </div>
            <div className="form-group">
              <label htmlFor="body">Body</label>
              <input
                type="text"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w3-input"
                id="body"
              />
            </div>
            <div className="form-submit">
              <button
                className="w3-btn w3-block w3-blue"
                type="submit"
                onClick={post}
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Help;
