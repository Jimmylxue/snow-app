import { memo, useEffect, useState } from 'react';
import { View, Text, Button, SafeAreaView } from 'react-native';
import navigate from '../../navigation/navigate';
import { getStorage, saveStorage } from '../../utils';

export default memo(() => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    (async () => {
      const storageCount = await getStorage('snow-test-count');
      setCount(+storageCount || 0);
    })();
  }, []);

  return (
    <SafeAreaView>
      <View>
        <Text>nowCount: {count}</Text>
        <Button
          onPress={async () => {
            await saveStorage('snow-test-count', String(count + 1));
            setCount(count + 1);
          }}
          title="add one"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <Button
          onPress={() => {
            navigate('Mine', {
              userId: 111,
            });
          }}
          title="navigate to Mine"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    </SafeAreaView>
  );
});
