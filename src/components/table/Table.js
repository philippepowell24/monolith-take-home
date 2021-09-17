import React from 'react';
import {
  TableCell,
  TableContainer,
  TableRow,
  TableBody,
  TableHeader,
  TableHead,
} from './TableStyles';

// Container
export default function Table({ children, ...restProps }) {
  return <TableContainer {...restProps}>{children}</TableContainer>;
}

// Table Row
Table.Row = ({ children, ...restProps }) => {
  return <TableRow {...restProps}>{children}</TableRow>;
};

// Table Cell
Table.Cell = ({ children, ...restProps }) => {
  return <TableCell {...restProps}>{children}</TableCell>;
};

// Table Head
Table.Head = ({ children, ...restProps }) => {
  return <TableHead {...restProps}>{children}</TableHead>;
};

// Table Header
Table.Header = ({ children, ...restProps }) => {
  return <TableHeader {...restProps}>{children}</TableHeader>;
};

// Table Body
Table.Body = ({ children, ...restProps }) => {
  return <TableBody {...restProps}>{children}</TableBody>;
};
