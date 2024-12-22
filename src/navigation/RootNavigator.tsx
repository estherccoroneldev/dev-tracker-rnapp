import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import UserDetailsScreen from '../screens/UserDetails/UserDetailsScreen.tsx';
import UserFinderScreen from '../screens/UserFinderScreen.tsx';
import UserRepositoriesScreen from '../screens/UserRepositoriesScreen/UserRepositoriesScreen.tsx';
import {User} from '../store/userReducer.ts';
import {COLORS} from '../shared/constants.ts';

// Definindo tipos de navegação
export type RootStackParamList = {
  UserFinder: undefined;
  UserDetails: {
    user: User;
  };
  UserRepositories: {
    reposUrl: string;
  };
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          title: '',
          headerShadowVisible: false,
          headerBackTitleVisible: false,
        }}
        initialRouteName="UserFinder">
        <Stack.Screen
          name="UserFinder"
          component={UserFinderScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="UserDetails"
          component={UserDetailsScreen}
          options={{
            headerLeftContainerStyle: {
              paddingLeft: 4,
            },
            headerTintColor: COLORS.secondary,
          }}
        />
        <Stack.Screen
          name="UserRepositories"
          options={{
            title: 'Repositories',
            headerTitleStyle: {
              fontWeight: '700',
              fontFamily: 'Nunito Bold',
              fontSize: 24,
              color: COLORS.black,
            },
            headerLeftContainerStyle: {
              paddingLeft: 4,
            },
            headerTintColor: COLORS.secondary,
          }}
          component={UserRepositoriesScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
