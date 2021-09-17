import usePaginator from './usePaginator';
import { renderHook } from '@testing-library/react-hooks';
import { act } from '@testing-library/react';

test('should increase page number by one when calling onPaginatorClick with arg "right', async () => {
  const { result } = renderHook(() => usePaginator(5));
  act(() => {
    result.current.handlePaginatorClick('right');
  });
  expect(result.current.page).toEqual(2);
});

test('should decrease page number by one when calling onPaginatorClick with arg "left', async () => {
  const { result } = renderHook(() => usePaginator(5));
  // Increment the value first to 2
  act(() => {
    result.current.handlePaginatorClick('right');
  });
  // Decrement the value back to 1
  act(() => {
    result.current.handlePaginatorClick('left');
  });
  expect(result.current.page).toEqual(1);
});

test('should clamp page value within range of the total number of pages', async () => {
  const { result } = renderHook(() => usePaginator(2));
  // Increment the value first to 2
  act(() => {
    result.current.handlePaginatorClick('right');
  });

  // Simulate overflowing to 3
  act(() => {
    result.current.handlePaginatorClick('right');
  });

  expect(result.current.page).toEqual(2);

  // Decrement the value back to 1
  act(() => {
    result.current.handlePaginatorClick('left');
  });

  // Simulate overflowing to 0
  act(() => {
    result.current.handlePaginatorClick('left');
  });
  expect(result.current.page).toEqual(1);
});
