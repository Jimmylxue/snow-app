import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text, Button, FavouriteIcon } from 'native-base';
import { navigates } from '../../../navigation/navigate';
import { baseFormatTime } from '../../../utils';
type TProps = {
  name: string;
  desc: string;
  isMine?: boolean;
  hideShowLove?: boolean;
  withOutMargin?: boolean;
  createTime?: string;
};

const PostCard = ({
  name,
  desc,
  createTime,
  hideShowLove = false,
  withOutMargin = false,
}: TProps) => {
  return (
    <View
      style={styles.card}
      mx={withOutMargin ? 0 : 3}
      mt={withOutMargin ? 0 : 3}>
      <View
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center">
        <Text style={styles.name}>{name}</Text>
      </View>

      <Text style={styles.description}>{desc}</Text>
      <View flexDirection="row" justifyContent="space-between" mt="2">
        {createTime && (
          <Text color="gray.400">{baseFormatTime(createTime)} 发布</Text>
        )}
        {!hideShowLove && (
          <View flexDirection="row" alignItems="center">
            <FavouriteIcon />
            <Text ml="2">0</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    marginTop: 10,
  },
});

export default PostCard;
