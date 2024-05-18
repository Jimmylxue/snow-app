import { memo } from 'react';
import { Box } from 'native-base';
import { Dimensions, SafeAreaView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AllClub } from './View/All';
import { MineClub } from './View/Mine';

const tabItemWidth = Dimensions.get('window').width / 2;
const Tab = createMaterialTopTabNavigator();

export default memo(() => {
  return (
    <SafeAreaView>
      <Box
        h="full"
        w="full"
        style={{
          paddingTop: 40,
        }}>
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
            options={{ tabBarLabel: '社团集合', lazy: true }}
          />
          <Tab.Screen
            name="my"
            component={MineClub}
            options={{ tabBarLabel: '我的社团', lazy: true }}
          />
        </Tab.Navigator>
      </Box>
    </SafeAreaView>
  );
});
