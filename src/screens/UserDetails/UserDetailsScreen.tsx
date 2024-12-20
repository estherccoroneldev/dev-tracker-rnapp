import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {Button, Text, View} from 'react-native';
import {RootStackParamList} from '../../navigation/RootNavigator';
import {useNavigation, useRoute} from '@react-navigation/native';
import type {RouteProp} from '@react-navigation/native';

type UserDetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'UserDetails'
>;

type UserDetailsScreenRouteProp = RouteProp<RootStackParamList, 'UserDetails'>;

const UserDetailsScreen: React.FC = () => {
  const navigation = useNavigation<UserDetailsScreenNavigationProp>();
  const {params} = useRoute<UserDetailsScreenRouteProp>();

  // Dados passados da tela anterior
  const userDetails = params?.user;

  const handleNavigateToUserRepos = () => {
    navigation?.navigate('UserRepositories');
  };

  return (
    <View>
      <Text>User Details</Text>
      <Text>{userDetails?.name}</Text>
      <Button title="See Repositories" onPress={handleNavigateToUserRepos} />
    </View>
  );
};

export default UserDetailsScreen;
