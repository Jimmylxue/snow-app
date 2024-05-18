import { memo } from 'react';
import { View } from 'native-base';
import { StaticWebView } from '../../components/StaticWebView';

export default memo(() => {
  return (
    <View h="full">
      <StaticWebView url="spectrogram/index.html" />
    </View>
  );
});
