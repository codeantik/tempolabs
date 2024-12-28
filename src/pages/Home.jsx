// TODO: Write code for the interview
import { useState, useEffect, useMemo } from "react";
import Item from "../components/Item";
import PageButton from "../components/PageButton";

const itemsPerPage = 10;
const baseUrl = `https://hacker-news.firebaseio.com/v0`;

function Home() {
  const [stories, setStories] = useState([]);
  const [paginatedStories, setPaginatedStories] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  console.log("paginatedStories", paginatedStories);

  const handleMoveToPage = (pageNumber) => {
    setPage(pageNumber);
    console.log("slice", stories.splice(pageNumber * itemsPerPage, 10));
    setPaginatedStories(stories.splice(pageNumber * itemsPerPage, 10));
  };

  const handleNextPage = (curPage) => {
    setPage((curPage) => curPage + 1);
  };

  const handlePrevPage = (curPage) => {
    setPage((curPage) => curPage - 1);
  };

  const handleFetchStories = async () => {
    try {
      const response = await fetch(`${baseUrl}/topstories.json?print=pretty`);
      const data = await response.json();
      console.log("response", data);
      setStories(data);
      setPaginatedStories(data.slice(0, 10));
      setPages(Math.ceil(data.length / 10));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleFetchStories();
  }, []);

  const offset = useMemo(() => {
    return page * itemsPerPage;
  }, [page, pages]);

  return (
    <div>
      {paginatedStories.map((story) => (
        <Item id={story} key={story} />
      ))}
      <div className="flex">
        {Array.from({ length: pages }, (_, i) => (
          <PageButton
            pageNumber={i + 1}
            key={i + 1}
            handleMoveToPage={handleMoveToPage}
            handleNextPage={handleNextPage}
            handlePrevPage={handlePrevPage}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
