import { memo } from 'react';
import { View } from 'native-base';
import WebView from '../../components/WebView';

export default memo(() => {
  return (
    <View h="full">
      <WebView
        url={`http://www.jimmyxuexue.top/`}
        onMessage={msg => {
          try {
          } catch (_) {}
        }}
      />
    </View>
  );
});
