import {
  Button,
  CheckIcon,
  FormControl,
  Modal,
  Select,
  Toast,
} from 'native-base';
import { useEffect, useState } from 'react';
import { useUpdateSleepTime } from '../../../service/studentManager';
import { useReactQuery } from '../../../config/react-query';

type TProps = {
  visible: boolean;
  onClose: () => void;
  startTime: number;
  endTime: number;
};
let hours = new Array(24).fill(0).map((_, index) => index + 1);

export function SelectTimeModal({
  visible,
  startTime,
  endTime,
  onClose,
}: TProps) {
  const [start, setStartTime] = useState<string>();
  const [end, setEndTime] = useState<string>();
  const { queryClient } = useReactQuery();

  const { mutateAsync } = useUpdateSleepTime({
    onSuccess: () => {
      Toast.show({ title: '设置成功' });
      queryClient.invalidateQueries('sleepTime');
    },
  });

  useEffect(() => {
    setStartTime(String(startTime));
    setEndTime(String(endTime));
  }, [startTime, endTime]);
  return (
    <Modal isOpen={visible} onClose={onClose}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>设置</Modal.Header>
        <Modal.Body>
          <FormControl>
            <FormControl.Label>开始时间</FormControl.Label>
            <Select
              selectedValue={start}
              minWidth="200"
              accessibilityLabel="Choose Service"
              placeholder="Choose Service"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={itemValue => setStartTime(itemValue)}>
              {hours.map(item => (
                <Select.Item
                  key={item}
                  label={String(item)}
                  value={String(item)}
                />
              ))}
            </Select>
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label>结束时间</FormControl.Label>
            <Select
              selectedValue={end}
              minWidth="200"
              accessibilityLabel="Choose Service"
              placeholder="Choose Service"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={itemValue => setEndTime(itemValue)}>
              {hours.map(item => (
                <Select.Item
                  key={item}
                  label={String(item)}
                  value={String(item)}
                />
              ))}
            </Select>
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button variant="ghost" colorScheme="blueGray" onPress={onClose}>
              Cancel
            </Button>
            <Button
              onPress={async () => {
                await mutateAsync({
                  disabledStartHour: Number(start),
                  disabledEndHour: Number(end),
                });
                onClose();
              }}>
              Save
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
