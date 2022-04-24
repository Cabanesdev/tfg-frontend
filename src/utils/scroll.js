const infiniteScroll = (divRef, page, setPage) => {
  if (divRef.current) {
    const { scrollTop, scrollHeight, clientHeight } = divRef.current;
    if (scrollTop + clientHeight === scrollHeight) {
      setPage(page+=1);
    }
  }
};

export default infiniteScroll;
