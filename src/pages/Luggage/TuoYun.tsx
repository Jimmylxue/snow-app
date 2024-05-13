import { memo, useState } from 'react';
import {
  Box,
  FormControl,
  Input,
  Button,
  Select,
  CheckIcon,
  Toast,
  ScrollView,
} from 'native-base';
import { SafeAreaView } from 'react-native';
import { goodsType, province } from './const';
import { useSubmitOrder } from '../../service/car';
import { adaptive } from '../../utils';

export default memo(() => {
  const [handlingRequirement, setHandlingRequirement] = useState<string>('');
  const [startAddr, setStartAddr] = useState<string>('');
  const [endAddr, setEndAddr] = useState<string>('');
  const [timeValid, setTimeValid] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [consignee, setConsignee] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [logisticsInformation, setLogisticsInformation] = useState<string>('');

  const { mutateAsync } = useSubmitOrder();

  return (
    <SafeAreaView>
      <ScrollView>
        <Box px={2} style={{ paddingTop: adaptive(220) }}>
          <FormControl mb="5">
            <FormControl.Label>货物种类</FormControl.Label>
            <Select
              selectedValue={type}
              minWidth="200"
              accessibilityLabel="Choose Service"
              placeholder="请选择货物种类"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={itemValue => setType(itemValue)}>
              {goodsType.map((item, index) => (
                <Select.Item key={index} label={item} value={item} />
              ))}
            </Select>
          </FormControl>
          <FormControl mb="5">
            <FormControl.Label>货物重量/体积</FormControl.Label>
            <Input value={weight} onChangeText={val => setWeight(val)} />
          </FormControl>
          <FormControl mb="5">
            <FormControl.Label>装卸要求</FormControl.Label>
            <Input
              value={handlingRequirement}
              onChangeText={val => setHandlingRequirement(val)}
            />
          </FormControl>
          <FormControl mb="5">
            <FormControl.Label>装卸等待时间</FormControl.Label>
            <Input />
          </FormControl>
          <FormControl mb="5">
            <FormControl.Label>起运地</FormControl.Label>
            <Select
              selectedValue={startAddr}
              minWidth="200"
              accessibilityLabel="Choose Service"
              placeholder="请选择起运地"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={itemValue => setStartAddr(itemValue)}>
              {province.map((item, index) => (
                <Select.Item key={index} label={item} value={item} />
              ))}
            </Select>
          </FormControl>
          <FormControl mb="5">
            <FormControl.Label>目的地</FormControl.Label>
            <Select
              selectedValue={endAddr}
              minWidth="200"
              accessibilityLabel="Choose Service"
              placeholder="请选择目的地"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={itemValue => setEndAddr(itemValue)}>
              {province.map((item, index) => (
                <Select.Item key={index} label={item} value={item} />
              ))}
            </Select>
          </FormControl>
          <FormControl mb="5">
            <FormControl.Label>时效要求</FormControl.Label>
            <Input value={timeValid} onChangeText={val => setTimeValid(val)} />
          </FormControl>
          <FormControl mb="5">
            <FormControl.Label>物流信息</FormControl.Label>
            <Input
              value={logisticsInformation}
              onChangeText={val => setLogisticsInformation(val)}
            />
          </FormControl>
          <FormControl mb="5">
            <FormControl.Label>收货人</FormControl.Label>
            <Input value={consignee} onChangeText={val => setConsignee(val)} />
          </FormControl>
          <FormControl mb="5">
            <FormControl.Label>联系电话</FormControl.Label>
            <Input value={phone} onChangeText={val => setPhone(val)} />
          </FormControl>
        </Box>
        <Button
          onPress={async () => {
            await mutateAsync({
              cargoRequirement: {
                endAddr,
                startAddr,
                handlingRequirement,
                timeValid: Number(timeValid),
                type,
                weight: Number(weight),
              },
              order: {
                addr: endAddr,
                consignee,
                phone,
                logisticsInformation,
              },
            });
            Toast.show({ title: '发布成功' });
          }}>
          发布托运请求
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
});
