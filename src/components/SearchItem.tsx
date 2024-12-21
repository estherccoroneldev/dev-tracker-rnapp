import React from 'react';
import {Icon, Input, IPinInputProps} from 'native-base';
import MaterialIcon from '@react-native-vector-icons/material-icons';

interface SearchItemProps extends IPinInputProps {
  handleChange: (text: string) => void;
}

// Design Tokens are here: https://docs.nativebase.io/next/design-tokens
const SearchItem: React.FC<SearchItemProps> = ({
  handleChange,
  placeholder,
  ...props
}) => {
  return (
    <Input
      my={2}
      p={4}
      placeholder={placeholder}
      placeholderTextColor="muted.400"
      variant="outlined"
      size="xl"
      borderRadius={24}
      onChangeText={handleChange}
      cursorColor="info.200"
      tintColor="info.200"
      borderColor="muted.200"
      focusOutlineColor="muted.200"
      autoCapitalize="none"
      InputRightElement={
        <Icon
          as={MaterialIcon}
          name="search"
          size={6}
          mr="4"
          color="muted.400"
        />
      }
      _dark={{
        backgroundColor: 'muted.200',
      }}
      _light={{
        backgroundColor: 'muted.200',
      }}
      {...props}
    />
  );
};

export default SearchItem;
