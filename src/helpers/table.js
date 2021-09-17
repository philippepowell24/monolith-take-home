import { isBalancePositive } from './currency';

// Select cell color based on whether balance is positive or negative
const selectCellTextColor = (amount) => {
  if (!amount) return 'black';
  return isBalancePositive(amount) ? 'green' : 'red';
};

// Select balance indicator and format to 2 decimal places
const formatPriceForCell = (amount) => {
  if (!amount) return '-';
  return amount < 0
    ? amount.toFixed(2).toString()
    : '+' + amount.toFixed(2).toString();
};

export { selectCellTextColor, formatPriceForCell };
