// Calculate total number of pages based on desired results per page
const calcTotalNumberOfPages = (data = [], resultsPerPage = 10) =>
  Math.ceil(data?.length / resultsPerPage);

// Process transactions to split them into equal arrays to display on different pages
const paginateTransactions = (
  transactions,
  totalNumberOfPages,
  resultsPerPage = 10
) => {
  const paginatedResult = [];
  let start = 0;
  let end = resultsPerPage;

  for (let i = 0; i < totalNumberOfPages; i++) {
    paginatedResult.push(transactions.slice(start, end));
    start += resultsPerPage;
    end += resultsPerPage;
  }
  return paginatedResult;
};

export { calcTotalNumberOfPages, paginateTransactions };
