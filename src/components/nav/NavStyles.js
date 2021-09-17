import styled from 'styled-components';

const Container = styled.nav`
  height: 100%;
  width: 100%;
  border-bottom: 0.5px solid rgba(164, 164, 164, 0.25);
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
  align-items: center;
`;

export { Container, Inner };
