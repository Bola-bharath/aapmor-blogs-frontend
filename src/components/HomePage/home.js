import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Blog from "../Blog/blog";
import axios from "axios";

const Home = (props) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getBlogsData();
  }, []);

  const getBlogsData = async () => {
    const response = await axios.get("http://localhost:3005/blogs");
    console.log(response.data);
    setBlogs(response.data);
  };
  return (
    <div>
      <Header />
      {blogs.map((blogItem) => {
        return <Blog blogDetails={blogItem} key={blogItem._id} />;
      })}
      <h1>Home</h1>
      <Footer />
    </div>
  );
};

export default Home;
