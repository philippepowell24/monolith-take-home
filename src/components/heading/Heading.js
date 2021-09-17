import React from 'react';
import {
  Container,
  HeadingFour,
  HeadingOne,
  HeadingThree,
  HeadingTwo,
} from './HeadingStyles';

// Heading Container
export default function Heading({ children, ...restProps }) {
  return <Container>{children}</Container>;
}

// Heading One
Heading.One = ({ children, ...restProps }) => {
  return <HeadingOne {...restProps}>{children}</HeadingOne>;
};

// Heading Two
Heading.Two = ({ children, ...restProps }) => {
  return <HeadingTwo {...restProps}>{children}</HeadingTwo>;
};

// Heading Three
Heading.Three = ({ children, ...restProps }) => {
  return <HeadingThree {...restProps}>{children}</HeadingThree>;
};

// Heading Four
Heading.Four = ({ children, ...restProps }) => {
  return <HeadingFour {...restProps}>{children}</HeadingFour>;
};
