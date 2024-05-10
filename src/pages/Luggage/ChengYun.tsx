import { memo, useState } from 'react';
import {
  Box,
  Stack,
  FormControl,
  Input,
  Divider,
  Button,
  View,
  Text,
  Modal,
} from 'native-base';
import { SafeAreaView } from 'react-native';

export default memo(() => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const hasBind = false;
  return (
    <SafeAreaView>
      {hasBind && (
        <View px={2} mt={2}>
          <View
            flexDir="row"
            justifyContent="space-between"
            alignItems="center">
            <Text>车牌号</Text>
            <Text>12345</Text>
          </View>
          <View
            flexDir="row"
            justifyContent="space-between"
            alignItems="center">
            <Text>车辆信息</Text>
            <Text>12345</Text>
          </View>
          <View
            flexDir="row"
            justifyContent="space-between"
            alignItems="center">
            <Text>车辆载重/体积量</Text>
            <Text>12345</Text>
          </View>
          <View
            flexDir="row"
            justifyContent="space-between"
            alignItems="center">
            <Text>车辆特性</Text>
            <Text>12345</Text>
          </View>
          <View
            flexDir="row"
            justifyContent="space-between"
            alignItems="center">
            <Text>车辆位置</Text>
            <Text>12345</Text>
          </View>
        </View>
      )}

      {hasBind ? <Button>修改车辆信息</Button> : <Button>绑定车辆信息</Button>}
      <Button>立即接单</Button>

      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>输入车辆信息</Modal.Header>
          <Modal.Body>
            <FormControl mb="5">
              <FormControl.Label>车牌号</FormControl.Label>
              <Input />
            </FormControl>
            <FormControl mb="5">
              <FormControl.Label>车辆信息</FormControl.Label>
              <Input />
            </FormControl>
            <FormControl mb="5">
              <FormControl.Label>车辆载重</FormControl.Label>
              <Input />
            </FormControl>
            <FormControl mb="5">
              <FormControl.Label>车辆特性</FormControl.Label>
              <Input />
            </FormControl>
            <FormControl mb="5">
              <FormControl.Label>车辆位置</FormControl.Label>
              <Input />
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
                }}>
                确定
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </SafeAreaView>
  );
});
