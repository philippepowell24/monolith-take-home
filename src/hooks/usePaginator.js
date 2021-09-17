import React from 'react';

const usePaginator = (totalNumberOfPages) => {
  // Local state
  const [page, setPage] = React.useState(1);

  // Handle pagination click
  // Only set state if page value within range of initial value and total number of pages
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

  return { page, handlePaginatorClick };
};

export default usePaginator;
