import {RouteProp, useRoute} from '@react-navigation/native';
import {Icon} from 'native-base';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Linking,
  ListRenderItem,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import RepoItem from '../../components/RepoItem';
import ReposList from '../../components/ReposList';
import useRepositories, {Repository} from '../../hooks/useRepositories';
import {RootStackParamList} from '../../navigation/RootNavigator';
import MaterialIcon from '@react-native-vector-icons/material-icons';
import {COLORS} from '../../shared/constants';

type UserRepositoriesScreenRouteProp = RouteProp<
  RootStackParamList,
  'UserRepositories'
>;

const handleGoToRepoDetails = (url: string) => {
  // uma boa pratica, por segurança e UX, seria perguntar pro usuário mediante um alert se quer sair do app
  Linking.openURL(url);
};

const renderRepository: ListRenderItem<Repository> = ({item}) => (
  <RepoItem
    key={item.id}
    onPress={() => handleGoToRepoDetails(item.html_url)}
    {...item}
  />
);

const UserRepositoriesScreen: React.FC = () => {
  const {params} = useRoute<UserRepositoriesScreenRouteProp>();

  const url = params?.reposUrl;
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');

  const {repos, loading, errorMessage} = useRepositories({
    reposUrl: url,
    order,
  });

  const handleSortOrder = () => {
    setOrder(prev => (prev === 'desc' ? 'asc' : 'desc'));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.sortContainer}>
        <Text style={styles.sort}>Sort By:</Text>
        <Pressable
          onPress={handleSortOrder}
          style={({pressed}) => [
            {
              backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
            },
            styles.wrapperCustom,
          ]}>
          <Text style={styles.match}>Best Match</Text>
          <Icon
            as={MaterialIcon}
            name="sort"
            color={COLORS.secondary}
            size={4}
            style={{transform: order === 'asc' ? 'rotate(180deg)' : undefined}}
          />
        </Pressable>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.secondary} />
      ) : errorMessage ? (
        <Text style={styles.error}>{errorMessage}</Text>
      ) : (
        <ReposList repositories={repos} renderRepository={renderRepository} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  sortContainer: {
    flexDirection: 'row',
    gap: 10,
    alignSelf: 'flex-end',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  wrapperCustom: {
    borderRadius: 8,
    padding: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  error: {
    color: 'red',
    marginTop: 20,
  },
  match: {
    fontSize: 12,
    color: COLORS.secondary,
    fontWeight: 'normal',
    fontFamily: 'Nunito Regular',
  },
  sort: {
    fontSize: 14,
    fontWeight: 'normal',
    fontFamily: 'Nunito Regular',
  },
});

export default UserRepositoriesScreen;
