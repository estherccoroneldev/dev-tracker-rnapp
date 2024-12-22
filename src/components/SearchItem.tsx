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
      px={4}
      py={2}
      alignItems="center"
      fontFamily="body"
      placeholder={placeholder}
      placeholderTextColor="muted.400"
      color="muted.400"
      variant="outlined"
      size="xl"
      borderRadius={12}
      onChangeText={handleChange}
      borderColor="muted.600"
      focusOutlineColor="muted.600"
      InputLeftElement={
        <Icon
          as={MaterialIcon}
          name="search"
          size={6}
          ml="4"
          color="muted.400"
        />
      }
      _dark={{
        backgroundColor: 'muted.900',
      }}
      _web={{
        shadow: 2,
        borderWidth: 0,
      }}
      _light={{
        backgroundColor: 'muted.600',
      }}
      {...props}
    />
  );
};

export default SearchItem;
