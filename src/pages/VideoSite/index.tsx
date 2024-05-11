import { memo } from 'react';
import { Box } from 'native-base';
import { Dimensions, SafeAreaView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AllClub } from './View/All';
import { MineClub } from './View/Mine';
import { UploadVideo } from './View/UploadVideo';

const tabItemWidth = Dimensions.get('window').width / 2;
const Tab = createMaterialTopTabNavigator();

export default memo(() => {
  return (
    <SafeAreaView>
      <Box h="full" w="full">
        <Tab.Navigator
          screenOptions={{
            swipeEnabled: false,
            tabBarPressColor: 'transparent',
            tabBarActiveTintColor: '#378BFF',
            tabBarInactiveTintColor: '#999999',
            tabBarLabelStyle: { fontSize: 14 },
            tabBarItemStyle: { width: tabItemWidth },
            tabBarStyle: {
              backgroundColor: '#f4f5f6',
            },
            // 选中的 tab 小横条的颜色
            tabBarIndicatorStyle: {
              height: '100%',
              backgroundColor: '#FFF',
              borderBottomWidth: 1.5,
              borderBottomColor: '#378BFF',
            },
          }}>
          <Tab.Screen
            name="all"
            component={AllClub}
            options={{ tabBarLabel: '视频集合', lazy: true }}
          />
          <Tab.Screen
            name="my"
            component={UploadVideo}
            options={{ tabBarLabel: '上传视频', lazy: true }}
          />
        </Tab.Navigator>
      </Box>
    </SafeAreaView>
  );
});
