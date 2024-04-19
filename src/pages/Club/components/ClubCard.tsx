import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text, Button } from 'native-base';
import { navigates } from '../../../navigation/navigate';
import { baseFormatTime } from '../../../utils';
type TProps = {
  name: string;
  desc: string;
  isMine?: boolean;
  joinTime?: string;
  clubId: number;
  onJoinClub?: () => void;
};

const ClubCard = ({
  name,
  desc,
  isMine = false,
  joinTime,
  clubId,
  onJoinClub,
}: TProps) => {
  return (
    <View style={styles.card} mx={3} mt={3}>
      <View
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center">
        <Text style={styles.name}>{name}</Text>
        {/* <TouchableOpacity>
          <Text fontSize="sm">查看历史活动</Text>
        </TouchableOpacity> */}
      </View>

      <Text style={styles.description}>{desc}</Text>
      {joinTime && (
        <Text style={styles.description} color="gray.500">
          {baseFormatTime(joinTime)} 加入社团
        </Text>
      )}
      {isMine ? (
        <Button
          mt="2"
          onPress={() => {
            navigates('ClubDetail', {
              clubId,
              clubName: name,
            });
          }}>
          进入社团
        </Button>
      ) : (
        <Button mt="2" onPress={onJoinClub}>
          立即加入
        </Button>
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

export default ClubCard;
