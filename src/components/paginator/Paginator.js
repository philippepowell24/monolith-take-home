import React from 'react';
import { Container, PaginatorText } from './PaginatorStyles';
import * as Icon from 'react-feather';

// Container
export default function Paginator({ children, ...restProps }) {
  return <Container>{children}</Container>;
}

// Paginator Left
Paginator.Left = ({ ...restProps }) => {
  return <Icon.ChevronLeft {...restProps} />;
};

// Paginator Right
Paginator.Right = ({ ...restProps }) => {
  return <Icon.ChevronRight {...restProps} />;
};

// Paginator Text
Paginator.Text = ({ children, ...restProps }) => {
  return <PaginatorText>{children}</PaginatorText>;
};
