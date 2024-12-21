import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Repository} from '../hooks/useRepositories';

interface Props extends Repository {
  onPress: () => void;
}
const RepoItem: React.FC<Props> = ({
  description,
  name,
  language,
  forks_count,
  stargazers_count,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.repoInfo} onPress={onPress}>
      <Text style={styles.name}>{name}</Text>
      {description ? <Text numberOfLines={2}>{description}</Text> : null}
      <View style={styles.row}>
        {language ? <Text>{language}</Text> : null}
        <Text>Forks: {forks_count}</Text>
        <Text>Stars: {stargazers_count}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default RepoItem;

const styles = StyleSheet.create({
  repoInfo: {
    marginTop: 10,
    borderRadius: 16,
    borderColor: '#F3F8FE',
    borderWidth: 2,
    padding: 10,
    gap: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff',
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
});
