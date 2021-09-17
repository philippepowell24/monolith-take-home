import useTransactions from './useTransactions';
import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import mockData from '../../public/transactions-large.json';
import { LARGE_TRANSACTIONS } from '../constants/endpoints';
import { ERROR } from '../constants/errors';
import { isCurrencySupported } from '../helpers/currency';

beforeAll(() => {
  const mock = new MockAdapter(axios);
  const url = `http://localhost:3000/${LARGE_TRANSACTIONS}`;
  mock.onGet(url).reply(200, mockData);
});

test('should fetch all transactions from file and process them', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useTransactions());
  await waitForNextUpdate();
  expect(result.current.processedTransactions.length).toEqual(20);
});

test('should catch erroneous transactions and store them on the transactions_with_error array on the user balance object', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useTransactions());
  await waitForNextUpdate();
  const userIdWithFailedTransactions = '49adccea-00af-4be0-94ef-b9b88dc87e7b';
  const [userBalanceWithFailedTransactions] =
    result.current.processedTransactions.filter(
      (e) => e?.userId === userIdWithFailedTransactions
    );
  expect(
    userBalanceWithFailedTransactions.total.transactions_with_error.length
  ).toEqual(3);
});

test('should map erroneous transactions to the correct error message', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useTransactions());
  await waitForNextUpdate();
  const userIdWithFailedTransactions = '49adccea-00af-4be0-94ef-b9b88dc87e7b';
  const [userBalanceWithFailedTransactions] =
    result.current.processedTransactions.filter(
      (e) => e?.userId === userIdWithFailedTransactions
    );
  const failedTransactions =
    userBalanceWithFailedTransactions.total.transactions_with_error;

  expect(failedTransactions[0].currency).toBeUndefined();
  expect(failedTransactions[0].error).toEqual(ERROR.MISSING_FIELDS);

  expect(parseFloat(failedTransactions[1].amount)).toEqual(NaN);
  expect(failedTransactions[1].error).toEqual(ERROR.INVALID_AMOUNT);

  expect(isCurrencySupported(failedTransactions[2].currency)).toEqual(false);
  expect(failedTransactions[2].error).toEqual(ERROR.CURRENCY_NOT_SUPPORTED);
});
