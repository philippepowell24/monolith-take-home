import styled from 'styled-components';

const Container = styled.nav`
  height: 100%;
  width: 100%;
  border-bottom: 0.5px solid black;
  /* background-color: purple; */
  grid-column: 1/-1;
  display: grid;
  grid-template-columns: inherit;
  grid-template-rows: 10vh;
  align-items: center;
`;

const Inner = styled.div`
  grid-column: 2/11;
  display: flex;
  height: 100%;
  /* background-color: red; */
  align-items: center;
`;

export { Container, Inner };
