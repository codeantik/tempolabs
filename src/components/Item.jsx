import { useState, useEffect } from "react";

const baseUrl = `https://hacker-news.firebaseio.com/v0`;

function Item(props) {
  const [story, setStory] = useState({});

  const { id } = props;

  const handleFetchStory = async () => {
    try {
      const response = await fetch(`${baseUrl}/item/${id}.json`);
      const data = await response.json();
    //   console.log("data", data);
      setStory(data);
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    handleFetchStory();
  }, [id]);

  return <div>{story.title}</div>;
}

export default Item;
