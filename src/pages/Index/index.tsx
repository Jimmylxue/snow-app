import { memo, useEffect } from 'react';
import { View, Text, Button, SafeAreaView } from 'react-native';

export default memo(() => {
  useEffect(() => {
    console.log(111);
  }, []);

  return (
    <SafeAreaView>
      <View>
        <Text>nowCount: 11</Text>
        <Button
          onPress={() => {}}
          title="add one"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    </SafeAreaView>
  );
});
