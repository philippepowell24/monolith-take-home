import styled from 'styled-components';

const Container = styled.nav`
  height: 100%;
  width: 100%;
  border-bottom: 0.5px solid black;
  /* background-color: red; */
  grid-column: 1/-1;
  display: grid;
  grid-template-columns: inherit;
  align-items: center;
`;

export { Container };
