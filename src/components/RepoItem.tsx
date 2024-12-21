import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Repository} from '../hooks/useRepositories';
import {Icon} from 'native-base';
import MaterialIcon from '@react-native-vector-icons/material-icons';
import {COLORS} from '../shared/constants';

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
        <View style={styles.row}>
          {language ? (
            <Text style={{color: COLORS.grayDark}}>{language}</Text>
          ) : null}
          <View style={{flexDirection: 'row'}}>
            <Icon
              as={MaterialIcon}
              name="star-border"
              color={COLORS.grayDark}
              size={4}
            />
            <Text style={{color: COLORS.grayDark}}>{stargazers_count}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Icon
              as={MaterialIcon}
              name="device-hub"
              color={COLORS.grayDark}
              size={4}
            />
            <Text style={{color: COLORS.grayDark}}>{forks_count}</Text>
          </View>
        </View>
        <View style={{backgroundColor: '#D4F4E2', padding: 4, borderRadius: 5}}>
          <Text style={{color: 'green', textAlign: 'right'}}>Open</Text>
        </View>
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
    flex: 1,
    alignItems: 'center',
  },
});
