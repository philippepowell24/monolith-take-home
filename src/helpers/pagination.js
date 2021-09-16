const calcTotalNumberOfPages = (data = [], resultsPerPage = 10) =>
  Math.ceil(data?.length / resultsPerPage);

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
