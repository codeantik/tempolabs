function PageButton(props) {
  const { pageNumber, handleMoveToPage, handlePrevPage, handleNextPage } =
    props;

  const handleClick = () => {
    console.log("pageNumber", pageNumber);
    // call the callback here
    handleMoveToPage(pageNumber);
  };
  return (
    <div>
      <button onClick={handleClick}>{pageNumber}</button>
    </div>
  );
}

export default PageButton;
