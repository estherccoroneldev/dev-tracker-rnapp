import {FlatList} from 'native-base';
import React from 'react';
import {ListRenderItem} from 'react-native';
import {Repository} from '../hooks/useRepositories';

interface ReposListProps {
  repositories: Repository[];
  renderRepository: ListRenderItem<Repository>;
}

const ReposList: React.FC<ReposListProps> = ({
  repositories,
  renderRepository,
}) => {
  return (
    <FlatList
      contentContainerStyle={{paddingBottom: 48}}
      px={4}
      showsVerticalScrollIndicator={false}
      data={repositories}
      renderItem={renderRepository}
    />
  );
};

export default ReposList;
