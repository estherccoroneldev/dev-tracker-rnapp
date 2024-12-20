import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import UserFinderScreen from '../screens/UserFinderScreen.tsx';
import UserDetailsScreen from '../screens/UserDetails/UserDetailsScreen.tsx';
import UserRepositoriesScreen from '../screens/UserRepositoriesScreen/UserRespositories.tsx';

// Definindo tipos de navegação
export type RootStackParamList = {
  UserFinder: undefined;
  // TO DO: Define User Type, Passa dados do usuário
  UserDetails: {user: any};
  UserRepositories: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="UserFinder">
        <Stack.Screen name="UserFinder" component={UserFinderScreen} />
        <Stack.Screen name="UserDetails" component={UserDetailsScreen} />
        <Stack.Screen
          name="UserRepositories"
          component={UserRepositoriesScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
