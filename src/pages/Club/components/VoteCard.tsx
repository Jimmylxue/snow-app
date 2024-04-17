import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text, Button } from 'native-base';
import { navigates } from '../../../navigation/navigate';
type TProps = {
  name: string;
  desc: string;
  isMine?: boolean;
};

const VoteCard = ({ name, desc, isMine = false }: TProps) => {
  return (
    <View style={styles.card} mx={3} mt={3}>
      <View
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center">
        <Text style={styles.name}>{name}</Text>
        <TouchableOpacity>
          <Text>2024-03-14 18:56:03</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.description}>{desc}</Text>
      <View flexDirection="row" justifyContent="space-between">
        <Button w="2/5" mt="2">
          我同意
        </Button>
        <Button w="2/5" mt="2">
          我反对
        </Button>
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

export default VoteCard;
