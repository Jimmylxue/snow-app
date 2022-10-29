import {renderHook} from '@testing-library/react-native';
import {act} from 'react-test-renderer';
import {useTestStatus} from '.';

describe('>>> test add one', () => {
  const {result} = renderHook(() => useTestStatus());
  // it('init test status count = 0', () => {
  //   console.log('init count', result.current.count);
  //   expect(result.current.count).toBe(0);
  // });

  act(() => {
    result.current.setCount(1);
  });

  it('value of setStatus after', () => {
    expect(result.current.count).toBe(1);
  });
});

export {};
