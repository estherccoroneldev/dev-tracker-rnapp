import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import PrimaryButton from '../../components/PrimaryButton';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {RootStackParamList} from '../../navigation/RootNavigator';
import {COLORS} from '../../shared/constants';
import {fetchUser} from '../../store/userReducer';
import {Icon} from 'native-base';
import MaterialIcon from '@react-native-vector-icons/material-icons';
import SearchItem from '../../components/SearchItem';

type UserFinderScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'UserFinder'
>;

const TITLE = 'Find a Dev';
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
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={120}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{flex: 1}}>
            <Text style={styles.title}>{TITLE}</Text>
            <SearchItem
              placeholder="Search a Dev"
              value={inputUsername}
              handleChange={setInputUsername}
            />
            {status === 'loading' ? (
              <ActivityIndicator />
            ) : status === 'succeeded' && user ? (
              <TouchableOpacity
                style={styles.userInfo}
                onPress={handleNavigateToUserDetails}>
                <View style={{flex: 1, gap: 4}}>
                  <Text style={styles.name}>{user.name}</Text>
                  <View style={styles.followersContent}>
                    <Text>Followers: {user.followers}</Text>
                    <Text>Following: {user.following}</Text>
                  </View>
                </View>
                <View>
                  <Icon
                    as={MaterialIcon}
                    name="chevron-right"
                    color={COLORS.secondary}
                    size={8}
                  />
                </View>
              </TouchableOpacity>
            ) : status === 'failed' ? (
              <Text style={styles.error}>: {error}</Text>
            ) : null}
          </View>
        </TouchableWithoutFeedback>

        <PrimaryButton title="Find" onPress={handleFindAUser} />
      </KeyboardAvoidingView>
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
    borderRadius: 16,
    borderColor: '#F3F8FE',
    borderWidth: 2,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    marginTop: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.secondary,
  },
  followersContent: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    borderRadius: 16,
    padding: 20,
    backgroundColor: COLORS.primary,
  },
  textButton: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 20,
  },
});

export default UserFinderScreen;
