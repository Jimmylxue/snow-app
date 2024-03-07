import { memo, useEffect } from 'react';
import SnowToast, { snowToastEventEmitter } from '../../utils/snowToast';
import { Button, SafeAreaView } from 'react-native';
import { View } from 'native-base';

export default memo(() => {
  useEffect(() => {
    const eventListener = snowToastEventEmitter?.addListener(
      'ToastClose',
      str => {
        console.log('event emit str', str);
      },
    );
    return () => eventListener?.remove();
  }, []);

  return (
    <SafeAreaView>
      <View>
        <Button
          onPress={() => {
            SnowToast.show('hello', true);
          }}
          title="base show"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <Button
          onPress={() => {
            SnowToast.callBackShow('hello callBack', false, res => {
              console.log('callback res', res);
            });
          }}
          title="callback show"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <Button
          onPress={async () => {
            const res = await SnowToast.promiseShow('hello promise', false);
            console.log('Promise res', res);
          }}
          title="promise show"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <Button
          onPress={async () => {
            const res = await SnowToast.eventShow('hello event', false);
          }}
          title="event show"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    </SafeAreaView>
  );
});
