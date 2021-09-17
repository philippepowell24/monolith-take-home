import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: inherit;
`;

const Image = styled.img`
  object-fit: contain;
  width: 100%;
  height: 50%;
`;

export { Container, Image };
