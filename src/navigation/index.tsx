import { createStackNavigator } from '@react-navigation/stack';
import Sms from '../pages/Sms';
import SmsDetail from '../pages/Sms/detail';
import BlackList from '../pages/Sms/blackList';
import {
  Button,
  FormControl,
  HamburgerIcon,
  Input,
  Menu,
  Modal,
  Pressable,
  View,
} from 'native-base';
import { useEffect, useState } from 'react';
import { serverUrl, setServerUrl } from '../service/client';
import Splash from '../pages/Splash';
import { Login } from '../pages/Login';
import { useAppState } from '../hooks/useAppState';
import { navigates, resetNavigate } from './navigate';
function Setting() {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const [value, setInput] = useState<string>('');

  useEffect(() => {
    setInput(serverUrl);
  }, [serverUrl]);

  return (
    <View mr={2}>
      <Menu
        w="190"
        trigger={triggerProps => {
          return (
            <Pressable accessibilityLabel="More options menu" {...triggerProps}>
              <HamburgerIcon size="lg" />
            </Pressable>
          );
        }}>
        <Menu.Item
          onPress={() => {
            navigates('BlackList', undefined);
          }}>
          查看黑名单
        </Menu.Item>
        <Menu.Item
          onPress={() => {
            setModalVisible(true);
          }}>
          修改Url
        </Menu.Item>
      </Menu>

      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>修改请求url</Modal.Header>
          <Modal.Body>
            <FormControl mt="3">
              <FormControl.Label>baseurl</FormControl.Label>
              <Input
                value={value}
                onChangeText={value => {
                  setInput(value);
                }}
              />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setModalVisible(false);
                }}>
                取消
              </Button>
              <Button
                onPress={() => {
                  setModalVisible(false);
                  setServerUrl(value);
                }}>
                确定
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </View>
  );
}

export default function StackScreen() {
  const Stack = createStackNavigator();
  const { state } = useAppState();
  useEffect(() => {
    if (state.isLoading) {
      return;
    }
    if (state?.token) {
      resetNavigate({
        index: 0,
        routes: [{ name: 'SmsList' }],
      });
      return;
    }

    if (!state?.token) {
      resetNavigate({
        index: 0,
        routes: [{ name: 'Login' }],
      });
      return;
    }
  }, [state]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: '#030303',
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: 'bold',
        },
        headerStyle: {
          borderBottomColor: '#ffffff',
          backgroundColor: '#fff',
          elevation: 0.5,
        },
      }}>
      <Stack.Screen
        name="Splash"
        options={{ headerShown: false }}
        component={Splash}
      />
      <Stack.Screen
        name="Login"
        options={{ headerShown: false }}
        component={Login}
      />
      <Stack.Screen
        name="SmsList"
        options={{ title: '短信列表', headerRight: Setting }}
        component={Sms}
      />
      <Stack.Screen
        name="SmsDetail"
        options={{ title: '短信详情' }}
        component={SmsDetail}
      />
      <Stack.Screen
        name="BlackList"
        options={{ title: '黑名单' }}
        component={BlackList}
      />
    </Stack.Navigator>
  );
}
