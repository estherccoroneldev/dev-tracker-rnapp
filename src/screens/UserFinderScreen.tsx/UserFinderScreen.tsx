import React, {useState} from 'react';
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {RootStackParamList} from '../../navigation/RootNavigator';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchUser} from '../../store/userReducer';
import {SafeAreaView} from 'react-native-safe-area-context';

type UserFinderScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'UserFinder'
>;

const UserFinderScreen: React.FC = () => {
  const navigation = useNavigation<UserFinderScreenNavigationProp>();
  const dispatch = useAppDispatch();

  const [inputUsername, setInputUsername] = useState<string>('');

  const status = useAppSelector(state => state.user.status);
  const user = useAppSelector(state => state.user.user);
  const error = useAppSelector(state => state.user.error);

  /**
   * Função para buscar os dados do usuário com base no nome fornecido
   */
  const handleFindAUser = () => {
    if (inputUsername.trim().length !== 0) {
      dispatch(fetchUser(inputUsername.trim().toLowerCase()));
    }
  };

  const handleNavigateToUserDetails = () => {
    user &&
      navigation?.navigate('UserDetails', {
        user,
      });
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Text style={styles.title}>Find a Dev</Text>

      {/* TO DO: Add the search icon to the end */}
      <TextInput
        style={styles.input}
        placeholder="Search a Dev"
        value={inputUsername}
        onChangeText={setInputUsername}
        cursorColor="#1C18F2"
      />

      {status === 'loading' ? (
        <ActivityIndicator />
      ) : status === 'succeeded' && user ? (
        <View style={styles.userInfo}>
          <TouchableOpacity onPress={handleNavigateToUserDetails}>
            <Text style={styles.name}>{user.name}</Text>
          </TouchableOpacity>
          <Text>Username: {user.login}</Text>
          <Text>Followers: {user.followers}</Text>
          <Text>Following: {user.following}</Text>
        </View>
      ) : status === 'failed' ? (
        <Text style={styles.error}>Error: {error}</Text>
      ) : null}

      <Button title="Find" onPress={handleFindAUser} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 32,
    fontWeight: '500',
    lineHeight: 39,
    marginBottom: 24,
  },
  input: {
    height: 40,
    borderColor: '#F3F8FE',
    backgroundColor: '#F3F8FE',
    borderWidth: 1,
    borderRadius: 24,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '100%',
    gap: 10,
  },
  userInfo: {
    marginTop: 20,
    alignItems: 'center',
  },
  error: {
    color: 'red',
    marginTop: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff',
  },
});

export default UserFinderScreen;
