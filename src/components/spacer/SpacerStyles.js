import styled from 'styled-components';

const Container = styled.div`
  margin-top: ${({ marginTop = '2rem' }) => marginTop};
  margin-bottom: ${({ marginBottom = '2rem' }) => marginBottom};
`;

export { Container };
