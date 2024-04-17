import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text, Button, FavouriteIcon, Avatar } from 'native-base';
import { navigates } from '../../../navigation/navigate';
type TProps = {
  name: string;
  desc: string;
  isMine?: boolean;
  hideShowLove?: boolean;
  withOutMargin?: boolean;
};

const PostComment = ({
  name,
  desc,
  hideShowLove = false,
  withOutMargin = false,
}: TProps) => {
  return (
    <View
      style={styles.card}
      mx={withOutMargin ? 0 : 3}
      mt={withOutMargin ? 0 : 3}>
      <View flexDir="row" alignItems="center">
        <Avatar
          size="sm"
          source={{
            uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
          }}></Avatar>
        <View>
          <Text fontSize="sm" ml="2">
            吉米 ：
          </Text>
        </View>
      </View>

      <Text style={styles.description}>{desc}</Text>
      <View flexDirection="row" justifyContent="flex-end" mt="2">
        <Text color="gray.400">2024-03-14 18:56:03</Text>
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

export default PostComment;
