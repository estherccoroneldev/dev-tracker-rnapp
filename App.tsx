import React from 'react';

import {NativeBaseProvider, extendTheme} from 'native-base';
import RootNavigator from './src/navigation/RootNavigator';

import {Provider} from 'react-redux';
import store from './src/store';

const config = {
  useSystemColorMode: false,
  initialColorMode: 'light',
};

export const theme = extendTheme({config});
type MyThemeType = typeof theme;
declare module 'native-base' {
  interface ICustomTheme extends MyThemeType {}
}

function App(): React.JSX.Element {
  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    </NativeBaseProvider>
  );
}

export default App;
