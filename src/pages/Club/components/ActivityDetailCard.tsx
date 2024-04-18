import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text, Button } from 'native-base';
import { baseFormatTime } from '../../../utils';
type TProps = {
  name: string;
  desc: string;
  createTime: string;
  onJoinActivity: () => void;
  onSeeDetail?: () => void;
};

const ActivityDetailCard = ({
  name,
  desc,
  createTime,
  onJoinActivity,
  onSeeDetail,
}: TProps) => {
  return (
    <TouchableOpacity onPress={onSeeDetail}>
      <View style={styles.card} mx={3} mt={3}>
        <View
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center">
          <Text style={styles.name}>{name}</Text>
          <TouchableOpacity>
            <Text>{baseFormatTime(createTime)}</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.description}>{desc}</Text>
        <Button
          mt="2"
          onPress={e => {
            e.stopPropagation();
            onJoinActivity();
          }}>
          我要反馈
        </Button>
        <Button
          mt="2"
          onPress={e => {
            e.stopPropagation();
            onJoinActivity();
          }}>
          立即签到
        </Button>
      </View>
    </TouchableOpacity>
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

export default ActivityDetailCard;
