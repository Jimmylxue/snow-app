import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text, Button } from 'native-base';
import { TVoteItem } from '../../../service/club';
import { baseFormatTime } from '../../../utils';
type TProps = {
  info: TVoteItem;
  onVote: (status: 1 | 2) => void;
  isManager: boolean;
};

const VoteCard = ({ info, onVote, isManager }: TProps) => {
  const aggressCount = info.recordItems.filter(
    item => item.choose === 1,
  ).length;
  const disAggressCount = info.recordItems.filter(
    item => item.choose === 2,
  ).length;

  return (
    <View style={styles.card} mx={3} mt={3}>
      <View
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center">
        <Text style={styles.name}>{info.name}</Text>
        <TouchableOpacity>
          <Text>{baseFormatTime(info.createTime)} 发起</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.description}>{info.desc}</Text>

      <View mt="2">
        <Text>
          投票情况：{aggressCount}人同意，{disAggressCount}人反对
        </Text>
      </View>

      <View mt="2">
        <Text>
          投票开始时间:{' '}
          {baseFormatTime(String(new Date(info.voteStartTime * 1000)))}
        </Text>
        <Text>
          投票开始时间:{' '}
          {baseFormatTime(String(new Date(info.voteEndTime * 1000)))}
        </Text>
      </View>
      {info.voteStatus === 2 && !isManager && (
        <>
          {info.myVote === -1 ? (
            <View flexDirection="row" justifyContent="space-between">
              <Button
                w="2/5"
                mt="2"
                disabled={info.voteStatus !== 2}
                onPress={() => {
                  onVote(1);
                }}>
                我同意
              </Button>
              <Button
                w="2/5"
                mt="2"
                disabled={info.voteStatus !== 2}
                onPress={() => {
                  onVote(2);
                }}>
                我反对
              </Button>
            </View>
          ) : (
            <Text mt={2}>
              您已投票，你选择{' '}
              <Text color="orange.500" fontWeight="semibold">
                {info.myVote === 1 ? '同意' : '反对'}
              </Text>
            </Text>
          )}
        </>
      )}
      {info.voteStatus === 1 && (
        <>
          <Text mt={2}>还未到投票时间，请等待！</Text>
        </>
      )}
      {info.voteStatus === 3 && (
        <>
          <Text mt={2}>投票已结束！</Text>
        </>
      )}
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

export default VoteCard;
