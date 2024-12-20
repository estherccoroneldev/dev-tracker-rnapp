import React from 'react';
import {Button, Text, View} from 'react-native';
import {RootStackParamList} from '../../navigation/RootNavigator';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

type UserFinderScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'UserFinder'
>;

const UserFinderScreen: React.FC = () => {
  const navigation = useNavigation<UserFinderScreenNavigationProp>();

  const handleNavigateToUserDetails = () => {
    navigation?.navigate('UserDetails', {
      user: {
        id: '123',
        name: 'Dev Leo',
      },
    });
  };

  return (
    <View>
      <Text>User Finder</Text>
      <Button title="Find" onPress={handleNavigateToUserDetails} />
    </View>
  );
};

export default UserFinderScreen;
