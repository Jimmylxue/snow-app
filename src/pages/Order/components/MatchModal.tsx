import {
  Button,
  CheckIcon,
  FormControl,
  Modal,
  Select,
  Toast,
} from 'native-base';
import { useMatchCarList, useSubmitMatch } from '../../../service/car';
import { useState } from 'react';
import { useReactQuery } from '../../../config/react-query';

type TProps = {
  orderId?: string;
  open: boolean;
  onClose: () => void;
};

export function MatchModal({ open, onClose, orderId }: TProps) {
  const { data } = useMatchCarList(
    ['matchCarList', orderId],
    {
      orderId: orderId!,
    },
    { refetchOnWindowFocus: false, enabled: !!orderId },
  );
  const { queryClient } = useReactQuery();

  const { mutateAsync } = useSubmitMatch({
    onSuccess: () => {
      Toast.show({
        title: '匹配成功',
      });
    },
  });

  const [select, setSelect] = useState<string>();

  return (
    <Modal isOpen={open} onClose={onClose}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>选择车辆</Modal.Header>
        <Modal.Body>
          <FormControl>
            <FormControl.Label>车牌号</FormControl.Label>
            <Select
              minWidth="200"
              accessibilityLabel="请选择车牌号"
              placeholder="请选择车牌号"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={itemValue => setSelect(itemValue)}>
              {data?.map((item, index) => (
                <Select.Item
                  key={index}
                  label={`车牌号：${item.carNumber}`}
                  value={String(item.id)}
                />
              ))}
            </Select>
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button variant="ghost" colorScheme="blueGray" onPress={onClose}>
              取消
            </Button>
            <Button
              onPress={async () => {
                const selectItem = data?.find(
                  item => item.id === Number(select),
                );
                if (!selectItem) {
                  Toast.show({
                    title: '没有匹配车辆',
                  });
                  return;
                }

                await mutateAsync({
                  carId: selectItem.id,
                  carUserId: selectItem.userId,
                  orderId: orderId!,
                });

                queryClient.invalidateQueries('orderList');
                onClose();
              }}>
              确定
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
