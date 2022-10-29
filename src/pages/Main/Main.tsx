import {View, Text, Button} from 'react-native';
import {useTestStatus} from '.';

export default function Main() {
  const {count, setCount} = useTestStatus();
  return (
    <View>
      <Text>nowCount: {count}</Text>
      <Button
        onPress={() => {
          setCount(count + 1);
        }}
        title="add one"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
}
