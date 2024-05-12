import { memo, useRef, useState } from 'react';
import {
  FormControl,
  Input,
  Button,
  View,
  Text,
  Modal,
  Select,
  CheckIcon,
  Toast,
} from 'native-base';
import { SafeAreaView } from 'react-native';
import { useBindCar, useCarMessage, useUpdateCar } from '../../service/car';
import { province } from './const';
import { adaptive } from '../../utils';

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

  const { data, refetch } = useCarMessage(['carMessage'], {}, {});

  const successCallBack = () => {
    Toast.show({ title: '操作成功' });
    refetch();
  };

  const { mutateAsync } = useBindCar({ onSuccess: successCallBack });
  const { mutateAsync: updateCar } = useUpdateCar({
    onSuccess: successCallBack,
  });

  const bindCar = data?.[0];

  return (
    <SafeAreaView>
      <View paddingTop={adaptive(200)}>
        {bindCar && (
          <View px={2} mt={2}>
            <View
              flexDir="row"
              justifyContent="space-between"
              alignItems="center">
              <Text>车牌号</Text>
              <Text>{bindCar.carNumber}</Text>
            </View>
            <View
              flexDir="row"
              justifyContent="space-between"
              alignItems="center">
              <Text>车辆类型</Text>
              <Text>{bindCar.carType}</Text>
            </View>
            <View
              flexDir="row"
              justifyContent="space-between"
              alignItems="center">
              <Text>车辆载重/体积量</Text>
              <Text>{bindCar.carWeight}</Text>
            </View>
            <View
              flexDir="row"
              justifyContent="space-between"
              alignItems="center">
              <Text>车辆特性</Text>
              <Text>{bindCar.carCharacter}</Text>
            </View>
            <View
              flexDir="row"
              justifyContent="space-between"
              alignItems="center">
              <Text>车辆位置</Text>
              <Text>{bindCar.carAddr}</Text>
            </View>
          </View>
        )}

        <Button
          onPress={() => {
            if (bindCar) {
              setCarNumber(bindCar.carNumber);
              setCarAddr(bindCar.carAddr);
              setCarCharacter(bindCar.carCharacter);
              setCarType(bindCar.carType);
              setCarWeight(String(bindCar.carWeight));
            }
            setModalVisible(true);
          }}>
          {bindCar ? '修改车辆信息' : '绑定车辆信息'}
        </Button>
      </View>

      {/* <Button>立即接单</Button> */}

      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>车辆信息</Modal.Header>
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
                  if (bindCar) {
                    await updateCar({
                      carNumber,
                      carType,
                      carCharacter,
                      carWeight,
                      carAddr,
                      id: bindCar.id,
                    });
                  } else {
                    await mutateAsync({
                      carNumber,
                      carType,
                      carCharacter,
                      carWeight,
                      carAddr,
                    });
                  }

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
