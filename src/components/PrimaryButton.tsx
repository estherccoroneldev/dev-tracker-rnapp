import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {COLORS} from '../shared/constants';
import {Heading} from 'native-base';

interface Props extends TouchableOpacityProps {
  title: string;
}

const PrimaryButton: React.FC<Props> = ({style, title, onPress, ...rest}) => {
  return (
    <TouchableOpacity
      style={StyleSheet.compose(styles.button, style)}
      onPress={onPress}
      {...rest}>
      <Heading size="sm" fontFamily="body" textAlign="center" color="#fff">
        {title}
      </Heading>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 16,
    padding: 12,
    marginHorizontal: 12,
    backgroundColor: COLORS.primary,
  },
});

export default PrimaryButton;
