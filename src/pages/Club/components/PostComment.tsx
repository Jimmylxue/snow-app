import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Avatar } from 'native-base';
import { TPostComment } from '../../../service/club';
import { baseFormatTime } from '../../../utils';
type TProps = {
  comment: TPostComment;
  withOutMargin?: boolean;
};

const PostComment = ({ comment, withOutMargin = false }: TProps) => {
  return (
    <View
      style={styles.card}
      mx={withOutMargin ? 0 : 3}
      mt={withOutMargin ? 0 : 3}>
      <View flexDir="row" alignItems="center">
        <Avatar
          size="sm"
          bg="white"
          source={require('../../../images/student.png')}></Avatar>
        <View>
          <Text fontSize="sm" ml="2">
            {comment?.user?.username} ：
          </Text>
        </View>
      </View>

      <Text style={styles.description}>{comment.content}</Text>
      <View flexDirection="row" justifyContent="flex-end" mt="2">
        <Text color="gray.400">{baseFormatTime(comment.createTime)}</Text>
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
