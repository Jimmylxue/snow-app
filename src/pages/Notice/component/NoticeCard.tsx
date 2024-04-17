import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text } from 'native-base';
type TProps = {
  name: string;
  desc: string;
  isMine?: boolean;
};

const NoticeCard = ({ name, desc }: TProps) => {
  return (
    <View style={styles.card} mx={3} mt={3}>
      <View
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center">
        <Text style={styles.name}>{name}</Text>
        <TouchableOpacity>
          <View w="2" h="2" bg="red.500" rounded="full"></View>
        </TouchableOpacity>
      </View>
      <Text style={styles.description}>{desc}</Text>
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
