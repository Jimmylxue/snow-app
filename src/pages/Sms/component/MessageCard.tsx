import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text } from 'native-base';
import { TSmsItem } from '../../../navigation/navigation';
type TProps = {
  info: TSmsItem;
  onSeeDetail?: () => void;
};

const MessageCard = ({ info, onSeeDetail }: TProps) => {
  return (
    <View style={styles.card} mx={3} mt={3}>
      <View
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center">
        <Text style={styles.name}>{info.body}</Text>
      </View>
      <TouchableOpacity onPress={onSeeDetail}>
        <Text style={styles.description}>点击检验是否垃圾短信</Text>
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
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    marginTop: 10,
  },
});

export default MessageCard;
