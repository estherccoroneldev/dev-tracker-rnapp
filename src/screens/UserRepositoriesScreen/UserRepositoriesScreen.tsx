import {RouteProp, useRoute} from '@react-navigation/native';
import {Heading} from 'native-base';
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

const PAGE_TITLE = 'Repositories';

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
      <Heading size="xl" px={4} fontWeight={500}>
        {PAGE_TITLE}
      </Heading>
      <View style={styles.sortContainer}>
        <Text>Sort By:</Text>
        <Pressable
          onPress={handleSortOrder}
          style={({pressed}) => [
            {
              backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
            },
            styles.wrapperCustom,
          ]}>
          <Text>{order.toUpperCase()}</Text>
        </Pressable>
      </View>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : errorMessage ? (
        <Text>Error: {errorMessage}</Text>
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
  },
});

export default UserRepositoriesScreen;
