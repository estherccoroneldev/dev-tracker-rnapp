import type {RouteProp} from '@react-navigation/native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {Dimensions, StyleSheet, Text, View, ViewProps} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SafeAreaView} from 'react-native-safe-area-context';
import PrimaryButton from '../../components/PrimaryButton';
import {RootStackParamList} from '../../navigation/RootNavigator';
import {COLORS} from '../../shared/constants';
import {User} from '../../store/userReducer';

type UserDetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'UserDetails'
>;

type UserDetailsScreenRouteProp = RouteProp<RootStackParamList, 'UserDetails'>;

const {height} = Dimensions.get('screen');

interface ItemProps {
  text: string;
  value: User['followers'] | User['following'];
  containerStyle?: ViewProps['style'];
}
const Item: React.FC<ItemProps> = ({text, value, containerStyle}) => {
  return (
    <View style={StyleSheet.compose(styles.itemContainer, containerStyle)}>
      <Text style={styles.itemText}>{text}</Text>
      <Text style={styles.itemValue}>{value}</Text>
    </View>
  );
};

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
      {/* FastImage improves performance, mostly when there are multiple images to show up */}
      <FastImage
        source={{
          uri: user.avatar_url,
        }}
        resizeMode={FastImage.resizeMode.cover}
        style={styles.avatar}
      />
      <View style={{flex: 1, paddingHorizontal: 20}}>
        <Text style={styles.name}>{user.name}</Text>

        {user.email ? (
          <Text style={styles.email}>Email: {user.email}</Text>
        ) : null}

        {user.bio ? (
          <Text numberOfLines={6} style={styles.bio}>
            Bio: {user.bio}
          </Text>
        ) : null}

        <View style={styles.contentItems}>
          <Item text="Followers" value={user.followers} />
          <View style={styles.divider} />
          <Item text="Following" value={user.following} />
        </View>
      </View>

      <PrimaryButton
        title="See Repositories"
        onPress={handleNavigateToUserRepos}
        style={{marginHorizontal: 20}}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  avatar: {
    height: height * 0.4,
    marginBottom: 20,
    borderRadius: 15,
    marginHorizontal: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Nunito Bold',
    color: COLORS.black,
  },
  bio: {
    flex: 0.9,
    fontSize: 16,
    fontWeight: '400',
    color: COLORS.black,
    marginVertical: 10,
  },
  itemContainer: {
    flex: 1,
    gap: 12,
  },
  itemText: {
    fontSize: 16,
    textAlign: 'center',
    color: COLORS.black,
  },
  itemValue: {
    fontSize: 18,
    color: COLORS.secondary,
    textAlign: 'center',
  },
  divider: {
    backgroundColor: COLORS.grayLight,
    width: 1,
    height: '100%',
  },
  contentItems: {
    flexDirection: 'row',
    gap: 20,
    alignContent: 'center',
    alignItems: 'center',
  },
  email: {
    color: COLORS.grayLight,
  },
});

export default UserDetailsScreen;
