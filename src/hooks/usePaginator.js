import React from 'react';

const usePaginator = (totalNumberOfPages) => {
  const [page, setPage] = React.useState(1);
  const handlePaginatorClick = (direction) => {
    switch (direction) {
      case 'left': {
        if (page > 1) {
          setPage((prev) => prev - 1);
        }
        break;
      }
      case 'right': {
        if (page < totalNumberOfPages) {
          setPage((prev) => prev + 1);
        }
        break;
      }
      default: {
      }
    }
  };
  return [page, handlePaginatorClick];
};

export default usePaginator;
