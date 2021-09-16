import React from 'react';
import axios from 'axios';
import { LARGE_TRANSACTIONS, SMALL_TRANSACTIONS } from '../constants/endpoints';
import {
  isAmountValid,
  isCurrencySupported,
  isEUR,
  isGBP,
  isUSD,
} from '../helpers/currency';
import { ERROR } from '../constants/errors';

const useTransactions = () => {
  // Local State
  const [transactions, setTransactions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const sortTransactions = ({ order, transactions }) => {
    return order === 'ASC'
      ? transactions.sort(
          (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
        )
      : transactions.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
  };

  // Memoize processTransaction function reference in order to avoid regenerating on subsequent renders
  const processTransactions = React.useCallback((transactions) => {
    let transactionMap = {};
    let result = [];

    // Sort transactions from oldest to newest
    const sortedTransactions = sortTransactions({
      order: 'ASC',
      transactions,
    });

    // Iterate over sorted transactions
    for (const transaction of sortedTransactions) {
      const { amount, currency, user_id, timestamp } = transaction;

      // If no existing user_id key inside transactionMap object, create an entry with default values
      if (!transactionMap[user_id]) {
        transactionMap[user_id] = {
          EUR: null,
          GBP: null,
          USD: null,
          lastActivity: null,
          transactions: [],
          transactions_with_error: [],
        };
      }

      // Store temporary pointer to specific user entry within transactionMap object
      let tmp = transactionMap[user_id];

      // Handle one or more missing fields inside the transaction
      if (!amount || !currency || !timestamp) {
        transactionMap[user_id] = {
          ...tmp,
          transactions_with_error: [
            ...tmp?.transactions_with_error,
            {
              transaction,
              error: ERROR.MISSING_FIELDS,
            },
          ],
        };
        continue;
      }

      // Handle unsupported currency inside the 'currency' field
      if (!isCurrencySupported(currency)) {
        transactionMap[user_id] = {
          ...tmp,
          transactions_with_error: [
            ...tmp?.transactions_with_error,
            {
              transaction,
              error: ERROR.CURRENCY_NOT_SUPPORTED,
            },
          ],
        };
        continue;
      }

      // Handle invalid value for 'amount'
      if (!isAmountValid(amount)) {
        transactionMap[user_id] = {
          ...tmp,
          transactions_with_error: [
            ...tmp?.transactions_with_error,
            {
              transaction,
              error: ERROR.INVALID_AMOUNT,
            },
          ],
        };
        continue;
      }

      // Append current transaction values to user entry
      // Add current transaction to list of user transactions (useful for single user view with detail on all individual transactions)
      transactionMap[user_id] = {
        ...tmp,
        EUR: isEUR(currency) ? tmp.EUR + parseFloat(amount) : tmp.EUR,
        GBP: isGBP(currency) ? tmp.GBP + parseFloat(amount) : tmp.GBP,
        USD: isUSD(currency) ? tmp.USD + parseFloat(amount) : tmp.USD,
        lastActivity: timestamp,
        transactions: [...tmp.transactions, transaction],
      };
    }

    // Extract all user IDs
    const keys = Object.keys(transactionMap);
    // Process final result array with all individual user balance objects
    for (let i = 0; i < keys.length; i++) {
      result.push({ userId: keys[i], total: transactionMap[keys[i]] });
    }
    return result;
  }, []);

  // Memoize result of processTransactions to avoid recomputing on subsequent renders
  const memoizedTransactions = React.useMemo(
    () => processTransactions(transactions),
    [transactions, processTransactions]
  );

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        // Fetch data from endpoint
        const { data } = await axios.get(
          `http://localhost:3000/${LARGE_TRANSACTIONS}`
        );
        // Set transactions with incoming data
        setTransactions(data);
      } catch (e) {
        setError(
          // TODO : create specific errors based on HTTP response status code
          'We failed to retrieve your transactions at this given time, please refresh and try again.'
        );
      } finally {
        // simulate network response latency
        // await new Promise((resolve) => setTimeout(resolve, 2500));
        setLoading(false);
      }
    })();
  }, []);

  return { processedTransactions: memoizedTransactions, loading, error };
};

export default useTransactions;
