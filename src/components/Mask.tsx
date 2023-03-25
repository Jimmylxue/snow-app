import {
  Box,
  CloseIcon,
  Divider,
  Modal,
  PresenceTransition,
  Pressable,
  Row,
  Spacer,
  Text,
} from 'native-base';
import { FC, HTMLAttributes, useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import { adaptive } from '../utils';

interface TProps extends HTMLAttributes<HTMLDivElement> {
  visible: boolean;
  height?: number;
  title: string;
  onClose: () => void;
}

export const Mask: FC<TProps> = ({
  visible,
  height = 3500,
  onClose,
  children,
  title,
}) => {
  const adaptiveHeight = useMemo(() => {
    return adaptive(height || 500);
  }, [height]);

  return (
    <Modal isOpen={visible} bg="transparent" position="absolute">
      <Pressable
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          width: '100%',
          height: '100%',
        }}
        onPress={onClose}
      />
      <Pressable
        style={{
          position: 'absolute',
          width: '100%',
          height: adaptiveHeight,
          bottom: 0,
        }}>
        <PresenceTransition
          visible={visible}
          style={{
            position: 'absolute',
            width: '100%',
            height: adaptiveHeight,
            bottom: 0,
            backgroundColor: '#fff',
          }}
          initial={{
            opacity: 0,
            translateY: adaptiveHeight,
          }}
          animate={{
            translateY: 0,
            opacity: 1,
            transition: {
              duration: 250,
            },
          }}>
          <Box>
            <Row py={4} px={4} alignItems="center">
              <Text fontSize="16px" fontWeight="semibold">
                {title}
              </Text>
              <Spacer />
              <TouchableOpacity onPress={onClose}>
                <CloseIcon />
              </TouchableOpacity>
            </Row>
            <Divider />
          </Box>
          <Box>{children}</Box>
        </PresenceTransition>
      </Pressable>
    </Modal>
  );
};
