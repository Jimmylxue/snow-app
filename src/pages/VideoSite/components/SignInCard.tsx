import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text, Avatar } from 'native-base';
import { baseFormatTime } from '../../../utils';
import { TSignInItem } from '../../../service/club';
type TProps = {
  record: TSignInItem;
};

const SignInCard = ({ record }: TProps) => {
  return (
    <View style={styles.card} mx={3} mt={3}>
      <View
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center">
        <View flexDir="row" alignItems="center">
          <Avatar
            size="sm"
            source={{
              uri: record?.user?.avatar,
            }}></Avatar>
          <View>
            <Text fontSize="sm" ml="2">
              {record?.user?.username} - {baseFormatTime(record.createTime)}{' '}
              签到
            </Text>
          </View>
        </View>
        <TouchableOpacity>
          <Text></Text>
        </TouchableOpacity>
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

export default SignInCard;
