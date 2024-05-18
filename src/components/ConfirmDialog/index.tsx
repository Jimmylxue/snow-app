import { AlertDialog, Button, Center } from 'native-base';
import { useRef, useState } from 'react';

type TShowConfigProps = {
  title: string;
  content?: string;
  cancelText?: string;
  confirmText?: string;
  onConfirm?: () => void;
};

export function useConfirmDialog() {
  const ref = useRef();
  const [show, setShow] = useState<boolean>(false);
  const closeDialog = () => {
    setShow(false);
  };

  const dialogContentRef = useRef<TShowConfigProps>();
  const showDialog = (props: TShowConfigProps) => {
    dialogContentRef.current = props;
    setShow(true);
  };

  const info = dialogContentRef.current;

  const node = (
    <Center>
      <AlertDialog
        leastDestructiveRef={ref}
        isOpen={show}
        onClose={closeDialog}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>{info?.title}</AlertDialog.Header>
          {info?.content && (
            <AlertDialog.Body>{info?.content}</AlertDialog.Body>
          )}

          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={closeDialog}>
                {info?.cancelText || '取消'}
              </Button>
              <Button
                // colorScheme="danger"
                onPress={() => {
                  info?.onConfirm?.();
                  closeDialog();
                }}>
                {info?.confirmText || '确定'}
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  );

  return { node, showDialog, closeDialog };
}
