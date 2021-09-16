import styled from 'styled-components';

const noSelection = `
-webkit-touch-callout: none;
-webkit-user-select: none;
-khtml-user-select: none;
-moz-user-select: none;
-ms-user-select: none;
user-select: none;
`;

const Container = styled.div``;

const HeadingOne = styled.h1`
  cursor: default;
  ${noSelection}
`;
const HeadingTwo = styled.h2`
  cursor: default;
  ${noSelection}
`;

const HeadingThree = styled.h3`
  cursor: default;
  ${noSelection}
`;

export { HeadingOne, HeadingTwo, HeadingThree, Container };
