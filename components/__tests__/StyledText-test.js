import * as React from 'react';
import { act } from 'react';
import renderer from 'react-test-renderer';

import { MonoText } from '../StyledText';

// Evita importar react-native (useColorScheme) después del teardown y estabiliza el test
jest.mock('../useColorScheme', () => ({
  useColorScheme: () => 'light',
}));

it('renders correctly', () => {
  let tree;
  act(() => {
    tree = renderer.create(<MonoText>Snapshot test!</MonoText>).toJSON();
  });
  expect(tree).toMatchSnapshot();
});
