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
  width: 100%;
  height: 100%;
  border-collapse: separate;
  border-spacing: ${({ spacing = { row: 0, column: 15 } }) =>
    `${spacing.row}px ${spacing.column}px`};
  position: absolute;
`;

const TableHeader = styled.th`
  text-align: left;
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
  border-bottom: 1px solid rgba(164, 164, 164, 0.25);
  text-align: left;
`;

export {
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
  TableHeader,
  TableHead,
};
