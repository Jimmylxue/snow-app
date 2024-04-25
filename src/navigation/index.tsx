import { createStackNavigator } from '@react-navigation/stack';
import Sms from '../pages/Sms';
import SmsDetail from '../pages/Sms/detail';
import {
  Button,
  FormControl,
  HamburgerIcon,
  Input,
  Modal,
  View,
} from 'native-base';
import { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { serverUrl, setServerUrl } from '../service/client';

function Setting() {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const [value, setInput] = useState<string>('');

  useEffect(() => {
    setInput(serverUrl);
  }, [serverUrl]);

  return (
    <View mr={2}>
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
        }}>
        <HamburgerIcon size="lg" />
      </TouchableOpacity>
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
        name="SmsList"
        options={{ title: '短信列表', headerRight: Setting }}
        component={Sms}
      />
      <Stack.Screen
        name="SmsDetail"
        options={{ title: '短信详情' }}
        component={SmsDetail}
      />
    </Stack.Navigator>
  );
}
