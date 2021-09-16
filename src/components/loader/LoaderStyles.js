import styled from 'styled-components';

const Container = styled.div`
  ::before {
    animation: 0.75s linear infinite spinner;
    animation-play-state: inherit;
    border: solid 3px #cfd0d1;
    border-bottom-color: black;
    border-radius: 50%;
    content: '';
    height: 20px;
    width: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    will-change: transform;
  }
  @keyframes spinner {
    0% {
      transform: translate3d(-50%, -50%, 0) rotate(0deg);
    }
    100% {
      transform: translate3d(-50%, -50%, 0) rotate(360deg);
    }
  }
`;

export { Container };
