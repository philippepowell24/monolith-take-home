import React from 'react';
import { Container, PaginatorText } from './PaginatorStyles';
import * as Icon from 'react-feather';

export default function Paginator({ children, ...restProps }) {
  return <Container>{children}</Container>;
}

Paginator.Left = ({ ...restProps }) => {
  return <Icon.ChevronLeft {...restProps} />;
};

Paginator.Right = ({ ...restProps }) => {
  return <Icon.ChevronRight {...restProps} />;
};

Paginator.Text = ({ children, ...restProps }) => {
  return <PaginatorText>{children}</PaginatorText>;
};
