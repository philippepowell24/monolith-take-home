import { CURRENCIES } from '../constants/currencies';

const isEUR = (currency) => currency === CURRENCIES.EUR;
const isGBP = (currency) => currency === CURRENCIES.GBP;
const isUSD = (currency) => currency === CURRENCIES.USD;
const isCurrencySupported = (currency) => (CURRENCIES[currency] ? true : false);
const formatPriceForCell = (amount) => {
  if (!amount) return '-';
  return amount < 0
    ? amount.toFixed(2).toString()
    : '+' + amount.toFixed(2).toString();
};

const isBalancePositive = (balance) => balance >= 0;

export {
  isEUR,
  isGBP,
  isUSD,
  isCurrencySupported,
  formatPriceForCell,
  isBalancePositive,
};
