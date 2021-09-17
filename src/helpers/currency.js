import { CURRENCIES } from '../constants/currencies';

// Check if currency is EUR
const isEUR = (currency) => currency === CURRENCIES.EUR;

// Check if currency is GBP
const isGBP = (currency) => currency === CURRENCIES.GBP;

// Check if currency is USD
const isUSD = (currency) => currency === CURRENCIES.USD;

// Check if currency is currently supported
const isCurrencySupported = (currency) => (CURRENCIES[currency] ? true : false);

// Check if balance is positive
const isBalancePositive = (balance) => balance >= 0;

// Check if amount is a valid number
const isAmountValid = (amount) => {
  const result = parseFloat(amount);
  return !Number.isNaN(result);
};

export {
  isEUR,
  isGBP,
  isUSD,
  isCurrencySupported,
  isBalancePositive,
  isAmountValid,
};
