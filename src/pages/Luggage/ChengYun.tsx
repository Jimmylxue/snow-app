import { memo, useState } from 'react';
import {
  FormControl,
  Input,
  Button,
  View,
  Text,
  Modal,
  Select,
  CheckIcon,
} from 'native-base';
import { SafeAreaView } from 'react-native';
import { useBindCar } from '../../service/car';
import { province } from './const';

export default memo(() => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  /** 车牌号 */
  const [carNumber, setCarNumber] = useState<string>('');
  /** 车辆型号 */
  const [carType, setCarType] = useState<string>('');
  /** 车辆载重 */
  const [carWeight, setCarWeight] = useState<string>('');
  /** 车辆特征 */
  const [carCharacter, setCarCharacter] = useState<string>('');
  /** 车辆地址 */
  const [carAddr, setCarAddr] = useState<string>('');

  const { mutateAsync } = useBindCar();

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

      <Button
        onPress={() => {
          setModalVisible(true);
        }}>
        绑定车辆信息
      </Button>
      <Button>立即接单</Button>

      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>输入车辆信息</Modal.Header>
          <Modal.Body>
            <FormControl mb="5">
              <FormControl.Label>车牌号</FormControl.Label>
              <Input
                value={carNumber}
                onChangeText={val => setCarNumber(val)}
              />
            </FormControl>
            <FormControl mb="5">
              <FormControl.Label>车辆类型</FormControl.Label>
              <Input value={carType} onChangeText={val => setCarType(val)} />
            </FormControl>
            <FormControl mb="5">
              <FormControl.Label>车辆载重</FormControl.Label>
              <Input
                value={carWeight}
                onChangeText={val => setCarWeight(val)}
              />
            </FormControl>
            <FormControl mb="5">
              <FormControl.Label>车辆特性</FormControl.Label>
              <Input
                value={carCharacter}
                onChangeText={val => setCarCharacter(val)}
              />
            </FormControl>
            <FormControl mb="5">
              <FormControl.Label>车辆位置</FormControl.Label>
              {/* <Input value={carAddr} onChangeText={val => setCarAddr(val)} /> */}
              <Select
                selectedValue={carAddr}
                minWidth="200"
                accessibilityLabel="Choose Service"
                placeholder="Choose Service"
                _selectedItem={{
                  bg: 'teal.600',
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={itemValue => setCarAddr(itemValue)}>
                {province.map((item, index) => (
                  <Select.Item key={index} label={item} value={item} />
                ))}
              </Select>
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
                onPress={async () => {
                  await mutateAsync({
                    carNumber,
                    carType,
                    carCharacter,
                    carWeight,
                    carAddr,
                  });
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
