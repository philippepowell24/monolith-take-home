import React from 'react';
import {
  TableCell,
  TableContainer,
  TableRow,
  TableBody,
  TableHeader,
  TableHead,
  TableButton,
} from './TableStyles';
import * as Icon from 'react-feather';
import { Link } from 'react-router-dom';

export default function Table({ children, ...restProps }) {
  return (
    // <div style={{ overflowX: 'auto' }}>
    //   <TableContainer>
    //     <TableHead>
    //       <TableRow>
    //         <TableHeader>User ID</TableHeader>
    //         <TableHeader>GBP</TableHeader>
    //         <TableHeader>USD</TableHeader>
    //         <TableHeader>EUR</TableHeader>
    //         <TableHeader>Last Activity</TableHeader>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {data.map((e) => (
    //         <TableRow key={e?.userId}>
    //           <TableCell>{e?.userId}</TableCell>
    //           <TableCell
    //             color={
    //               !e?.total?.GBP ? 'black' : e?.total?.GBP > 0 ? 'green' : 'red'
    //             }
    //           >
    //             {e?.total?.GBP.toFixed(2) || '-'}
    //           </TableCell>
    //           <TableCell
    //             color={
    //               !e?.total?.USD ? 'black' : e?.total?.USD > 0 ? 'green' : 'red'
    //             }
    //           >
    //             {e?.total?.USD.toFixed(2) || '-'}
    //           </TableCell>
    //           <TableCell
    //             color={
    //               !e?.total?.EUR ? 'black' : e?.total?.EUR > 0 ? 'green' : 'red'
    //             }
    //           >
    //             {e?.total?.EUR.toFixed(2) || '-'}
    //           </TableCell>
    //           <TableCell>{e?.total?.lastActivity}</TableCell>
    //           <TableCell>
    //             <Link to={`/transactions/${e?.userId}`}>
    //               <TableButton>
    //                 <Icon.ArrowRight color="white" />
    //               </TableButton>
    //             </Link>
    //           </TableCell>
    //         </TableRow>
    //       ))}
    //     </TableBody>
    //   </TableContainer>
    // </div>
    <TableContainer {...restProps}>{children}</TableContainer>
  );
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
