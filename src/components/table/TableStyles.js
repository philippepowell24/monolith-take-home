import styled from 'styled-components';

const TableContainer = styled.table`
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  text-align: left;
`;

const TableHead = styled.thead``;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  transition: all 0.1s;

  :hover {
    background-color: #f7f7f7;
  }
`;

const TableCell = styled.td`
  /* background-color: ${({ color = 'white' }) => color}; */
  color: ${({ color = 'black' }) => color};
  padding-left: 0.1rem;
  padding-right: 0.1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #f7f7f7;
  text-align: left;
`;

const TableButton = styled.button`
  background-color: black;
  outline: none;
  border: none;
  padding-left: 0.3rem;
  padding-right: 0.3rem;
  padding-top: 0.1rem;
  padding-bottom: 0.1rem;
  border-radius: 0.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export {
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
  TableHeader,
  TableHead,
  TableButton,
};
