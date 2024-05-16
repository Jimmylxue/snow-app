import { Button, CheckIcon, FormControl, Modal, Select } from 'native-base';
import { useMatchCarList } from '../../../service/car';
import { useState } from 'react';

type TProps = {
  orderId?: number;
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

  const [select, setSelect] = useState<string>();

  return (
    <Modal isOpen={open} onClose={onClose}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Contact Us</Modal.Header>
        <Modal.Body>
          <FormControl>
            <FormControl.Label>Name</FormControl.Label>
            <Select
              minWidth="200"
              accessibilityLabel="Choose Service"
              placeholder="Choose Service"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={itemValue => setSelect(itemValue)}>
              <Select.Item label="UX Research" value="ux" />
              <Select.Item label="Web Development" value="web" />
              <Select.Item label="Cross Platform Development" value="cross" />
              <Select.Item label="UI Designing" value="ui" />
              <Select.Item label="Backend Development" value="backend" />
            </Select>
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button variant="ghost" colorScheme="blueGray" onPress={onClose}>
              Cancel
            </Button>
            <Button
              onPress={() => {
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
