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
      <View style={{gap: 3}}>
        <Text style={styles.name}>{name}</Text>
        {description ? (
          <Text numberOfLines={2} style={styles.description}>
            {description}
          </Text>
        ) : null}
        <View style={styles.row}>
          <View style={[styles.row, styles.rowContainer]}>
            {language ? (
              <Text style={{color: COLORS.grayDark}}>{language}</Text>
            ) : null}
            <View style={styles.row}>
              <Icon
                as={MaterialIcon}
                name="star-border"
                color={COLORS.grayDark}
                size={4}
              />
              <Text style={{color: COLORS.grayDark}}>{stargazers_count}</Text>
            </View>
            <View style={styles.row}>
              <Icon
                as={MaterialIcon}
                name="device-hub"
                color={COLORS.grayDark}
                size={4}
              />
              <Text style={{color: COLORS.grayDark}}>{forks_count}</Text>
            </View>
          </View>
          <View style={styles.open}>
            <Text style={styles.openText}>Open</Text>
          </View>
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
    padding: 12,
    gap: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#007bff',
    fontFamily: 'Nunito Bold',
  },
  description: {
    fontWeight: 'normal',
    fontFamily: 'Nunito Regular',
    fontSize: 14,
  },
  open: {
    backgroundColor: '#D4F4E2',
    padding: 4,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  openText: {
    color: 'green',
    textAlign: 'right',
    fontWeight: 'normal',
    fontFamily: 'Nunito Regular',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowContainer: {
    flex: 1,
    gap: 12,
  },
  textItem: {
    color: COLORS.grayDark,
    fontWeight: 'normal',
    fontFamily: 'Nunito Regular',
    fontSize: 12,
  },
});
