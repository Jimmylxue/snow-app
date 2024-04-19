import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text } from 'native-base';
import { TUserLetter } from '../../../navigation/navigation';
import { EReadStatus } from '../../../service/letter';
type TProps = {
  info: TUserLetter;
  onSeeDetail: () => void;
};

const NoticeCard = ({ info, onSeeDetail }: TProps) => {
  return (
    <View style={styles.card} mx={3} mt={3}>
      <View
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center">
        <Text style={styles.name}>{info.letter.title}</Text>
        {info.status === EReadStatus.未读 && (
          <View w="2" h="2" bg="red.500" rounded="full"></View>
        )}
      </View>
      <TouchableOpacity onPress={onSeeDetail}>
        <Text style={styles.description}>点击查看详情</Text>
      </TouchableOpacity>
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

export default NoticeCard;
