import styled from 'styled-components';
import { animated } from 'react-spring';

const noSelection = `
-webkit-touch-callout: none;
-webkit-user-select: none;
-khtml-user-select: none;
-moz-user-select: none;
-ms-user-select: none;
user-select: none;
`;

const TableContainer = styled(animated.table)`
  border-collapse: collapse;
  width: 100%;
  height: 100%;
  /* background-color: khaki; */
  position: absolute;
`;

const TableHeader = styled.th`
  text-align: left;
  padding-bottom: 1rem;
  ${({ noSelect = true }) => (noSelect ? noSelection : '')}
`;

const TableHead = styled.thead``;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  transition: all 0.3s;
  border-radius: 3px;
  cursor: ${({ pointer = true }) => (pointer ? 'pointer' : 'default')};
  opacity: ${({ opacity = 0.7 }) => opacity};
  box-shadow: 0px 0px 5px 1px rgba(255, 255, 255, 0.25);
  -webkit-box-shadow: 0px 0px 5px 1px rgba(255, 255, 255, 0.25);
  -moz-box-shadow: 0px 0px 5px 1px rgba(255, 255, 255, 0.25);
  ${({ hover = true }) =>
    hover &&
    `
    :hover {
      opacity: 1;
      box-shadow: 0px 0px 5px 1px rgba(164,164,164,0.25);
      -webkit-box-shadow: 0px 0px 5px 1px rgba(164,164,164,0.25);
      -moz-box-shadow: 0px 0px 5px 1px rgba(164,164,164,0.25);
    }
    `}
  ${({ fullHeight = false }) => fullHeight && `height: 100%;`}
`;

const TableCell = styled.td`
  color: ${({ color = 'black' }) => color};
  padding-left: 0.1rem;
  padding-right: 0.1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(164, 164, 164, 0.25);
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
