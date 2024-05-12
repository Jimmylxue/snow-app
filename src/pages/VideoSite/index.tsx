import { memo, useEffect } from 'react';
import { Box } from 'native-base';
import { SafeAreaView } from 'react-native';
import { AllVideo } from './View/All';
import { useNavigation } from '@react-navigation/native';
import { adaptive } from '../../utils';

export default memo(() => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: '视频分类',
    });
  }, [navigation]);

  return (
    <SafeAreaView>
      <Box
        h="full"
        w="full"
        style={{
          paddingTop: adaptive(200),
        }}>
        <AllVideo />
      </Box>
    </SafeAreaView>
  );
});
