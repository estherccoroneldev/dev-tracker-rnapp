import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  Text,
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
import {Box, Heading, Icon, Image, VStack} from 'native-base';
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex: 1}}>
          <Box _light={{bg: '#fff'}} flex={1}>
            <VStack _light={{bg: 'muted.700'}} w={'100%'} pt={8} px={4}>
              <SearchItem
                placeholder="Search a Dev"
                value={inputUsername}
                handleChange={setInputUsername}
              />
              <Heading
                size="2xl"
                fontFamily="heading"
                position="absolute"
                color="#FFFFFF"
                top={180}
                zIndex={1}
                left={10}
                w="80%">
                {TITLE}
              </Heading>
              <Image
                alignSelf="center"
                source={require('../../../assets/images/banner-tech.png')}
                alt="banner-tech"
                borderRadius={16}
                resizeMode="cover"
                bottom={-20}
              />
            </VStack>

            {status === 'loading' ? (
              <ActivityIndicator
                size="large"
                color={COLORS.secondary}
                style={styles.indicator}
              />
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
          </Box>
          <PrimaryButton title="Find" onPress={handleFindAUser} />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    marginTop: 40,
    marginHorizontal: 12,
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
    color: COLORS.secondary,
    fontWeight: '700',
    fontFamily: 'Nunito Bold',
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
  indicator: {
    marginTop: 40,
  },
});

export default UserFinderScreen;
