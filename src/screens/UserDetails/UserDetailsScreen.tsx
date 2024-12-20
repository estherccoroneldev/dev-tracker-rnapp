import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {Button, Dimensions, Image, StyleSheet, Text} from 'react-native';
import {RootStackParamList} from '../../navigation/RootNavigator';
import {useNavigation, useRoute} from '@react-navigation/native';
import type {RouteProp} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

type UserDetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'UserDetails'
>;

type UserDetailsScreenRouteProp = RouteProp<RootStackParamList, 'UserDetails'>;

const {width, height} = Dimensions.get('screen');

const UserDetailsScreen: React.FC = () => {
  const navigation = useNavigation<UserDetailsScreenNavigationProp>();
  const {params} = useRoute<UserDetailsScreenRouteProp>();

  // Dados passados da tela anterior, os quais também podem ser acessados do store
  const user = params?.user;

  const handleNavigateToUserRepos = () => {
    user &&
      navigation?.navigate('UserRepositories', {
        reposUrl: user.repos_url,
      });
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Image source={{uri: user.avatar_url}} style={styles.avatar} />
      <Text style={styles.name}>{user.name}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Followers: {user.followers}</Text>
      <Text>Following: {user.following}</Text>
      <Text>Public Repos: {user.public_repos}</Text>
      <Text>Bio: {user.bio}</Text>

      <Button title="See Repositories" onPress={handleNavigateToUserRepos} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatar: {
    width: width,
    height: height * 0.4,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default UserDetailsScreen;
