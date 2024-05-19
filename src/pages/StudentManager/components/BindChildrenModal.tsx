import { Button, FormControl, Modal, Input, Toast } from 'native-base';
import { useState } from 'react';
import { useBindChild } from '../../../service/studentManager';
import { useReactQuery } from '../../../config/react-query';

type TProps = {
  visible: boolean;
  onClose: () => void;
};

export function BindChildrenModal({ visible, onClose }: TProps) {
  const [phone, setPhone] = useState<string>();
  const { queryClient } = useReactQuery();
  const { mutateAsync } = useBindChild({
    onSuccess: () => {
      Toast.show({ title: '绑定成功' });
      queryClient.invalidateQueries('childrenList');
    },
  });

  return (
    <Modal isOpen={visible} onClose={onClose}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>绑定孩子账号</Modal.Header>
        <Modal.Body>
          <FormControl>
            <FormControl.Label>孩子手机号</FormControl.Label>
            <Input
              value={phone}
              onChangeText={val => {
                setPhone(val);
              }}
            />
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button variant="ghost" colorScheme="blueGray" onPress={onClose}>
              取消
            </Button>
            <Button
              onPress={async () => {
                if (!phone || phone.length !== 11) {
                  Toast.show({
                    title: '请输入正确的手机号',
                  });
                  return;
                }
                await mutateAsync({
                  phone,
                });
                onClose();
              }}>
              绑定
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
