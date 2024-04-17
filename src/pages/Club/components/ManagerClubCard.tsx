import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text, Button } from 'native-base';
import { THandleType } from './CreateNotifyClub';
type TProps = {
  name: string;
  desc: string;
  isMine?: boolean;
  onHandlePush?: (modalType: THandleType) => void;
};

const ManagerClubCard = ({ name, desc, onHandlePush }: TProps) => {
  return (
    <View style={styles.card} mx={3} mt={3}>
      <View
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center">
        <Text style={styles.name}>{name}</Text>
        <TouchableOpacity>
          <Text fontSize="sm">查看历史活动</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.description}>{desc}</Text>
      <Button
        mt="2"
        onPress={() => {
          onHandlePush?.('createAnnouncement');
        }}>
        发布通知
      </Button>
      <Button
        mt="2"
        onPress={() => {
          onHandlePush?.('createVote');
        }}>
        发起投票
      </Button>
      <Button
        mt="2"
        onPress={() => {
          onHandlePush?.('createActivity');
        }}>
        发布活动
      </Button>
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

export default ManagerClubCard;
