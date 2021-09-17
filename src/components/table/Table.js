import React from 'react';
import {
  TableCell,
  TableContainer,
  TableRow,
  TableBody,
  TableHeader,
  TableHead,
} from './TableStyles';

export default function Table({ children, ...restProps }) {
  return <TableContainer {...restProps}>{children}</TableContainer>;
}

Table.Row = ({ children, ...restProps }) => {
  return <TableRow {...restProps}>{children}</TableRow>;
};

Table.Cell = ({ children, ...restProps }) => {
  return <TableCell {...restProps}>{children}</TableCell>;
};

Table.Head = ({ children, ...restProps }) => {
  return <TableHead {...restProps}>{children}</TableHead>;
};

Table.Header = ({ children, ...restProps }) => {
  return <TableHeader {...restProps}>{children}</TableHeader>;
};

Table.Body = ({ children, ...restProps }) => {
  return <TableBody {...restProps}>{children}</TableBody>;
};
