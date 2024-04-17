import DateTimePicker from '@react-native-community/datetimepicker';
import {
  Button,
  FormControl,
  Input,
  Modal,
  TextArea,
  Toast,
  View,
} from 'native-base';
import { useState } from 'react';
import {
  useAddActivity,
  useAddClub,
  useLaunchVote,
} from '../../../service/club';
import { useReactQuery } from '../../../config/react-query';
import dayjs from 'dayjs';

export type THandleType =
  | 'createClub'
  | 'createAnnouncement'
  | 'createActivity'
  | 'createVote';

type TProps = {
  clubId: number;
  showModal: boolean;
  onClose: () => void;
  modalType: THandleType;
};

export function CreateNotifyClub({
  showModal,
  modalType,
  onClose,
  clubId,
}: TProps) {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { queryClient } = useReactQuery();

  const resetForm = () => {
    setTitle('');
    setContent('');
    setStartDate(new Date());
    setEndDate(new Date());
  };

  const { mutateAsync: addClub } = useAddClub({
    onSuccess() {
      Toast.show({ title: '社团创建成功' });
      queryClient.invalidateQueries('allClub');
    },
  });

  const { mutateAsync: launchVote } = useLaunchVote({
    onSuccess() {
      Toast.show({ title: '投票发起成功' });
      queryClient.invalidateQueries('allClub');
    },
  });

  const { mutateAsync: addActivity } = useAddActivity({
    onSuccess() {
      Toast.show({ title: '活动创建成功' });
      queryClient.invalidateQueries('allClub');
    },
  });

  const isCreateClub = modalType === 'createClub';
  const isCreateActivity = modalType === 'createActivity';
  const isCreateAnnounce = modalType === 'createAnnouncement';
  const isCreateVote = modalType === 'createVote';

  const onConfirm = async () => {
    if (isCreateClub) {
      await addClub({ name: title, desc: content });
      return;
    }
    if (isCreateVote) {
      await launchVote({
        name: title,
        desc: content,
        clubId,
      });
      return;
    }
    if (isCreateActivity) {
      await addActivity({
        name: title,
        desc: content,
        clubId,
        signStartTime: dayjs(startDate).startOf('day').valueOf() / 1000,
        signEndTime: dayjs(endDate).endOf('day').valueOf() / 1000,
      });
      return;
    }
  };

  return (
    <Modal isOpen={showModal} onClose={onClose}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>
          {isCreateClub
            ? '创建社团'
            : isCreateActivity
            ? '发布活动'
            : '发布通知'}{' '}
        </Modal.Header>
        <Modal.Body>
          {isCreateClub && (
            <>
              <FormControl>
                <FormControl.Label>{'社团名称'}</FormControl.Label>
                <Input
                  placeholder={'请输入社团名称'}
                  w="100%"
                  value={title}
                  onChangeText={val => setTitle(val)}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>{'社团描述'}</FormControl.Label>
                {/* @ts-ignore */}
                <TextArea
                  aria-label="t1"
                  numberOfLines={4}
                  placeholder={'请输入社团描述'}
                  // isInvalid
                  _dark={{
                    placeholderTextColor: 'gray.300',
                  }}
                  mb="5"
                  value={content}
                  onChangeText={val => setContent(val)}
                />
              </FormControl>
            </>
          )}
          {isCreateAnnounce && (
            <>
              <FormControl>
                <FormControl.Label>{'通知标题'}</FormControl.Label>
                <Input
                  placeholder={'请输入通知标题'}
                  w="100%"
                  value={title}
                  onChangeText={val => setTitle(val)}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>{'通知内容'}</FormControl.Label>
                {/* @ts-ignore */}
                <TextArea
                  aria-label="t1"
                  numberOfLines={4}
                  placeholder={'请输入通知内容'}
                  // isInvalid
                  _dark={{
                    placeholderTextColor: 'gray.300',
                  }}
                  mb="5"
                  value={content}
                  onChangeText={val => setContent(val)}
                />
              </FormControl>
            </>
          )}
          {isCreateActivity && (
            <>
              <FormControl>
                <FormControl.Label>{'活动标题'}</FormControl.Label>
                <Input
                  placeholder={'请输入活动标题'}
                  w="100%"
                  value={title}
                  onChangeText={val => setTitle(val)}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>{'活动内容'}</FormControl.Label>
                {/* @ts-ignore */}
                <TextArea
                  aria-label="t1"
                  numberOfLines={4}
                  placeholder={'请输入活动内容'}
                  // isInvalid
                  _dark={{
                    placeholderTextColor: 'gray.300',
                  }}
                  mb="5"
                  value={content}
                  onChangeText={val => setContent(val)}
                />
              </FormControl>
              <FormControl>
                <View
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="space-between">
                  <FormControl.Label>{'开始时间'}</FormControl.Label>
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={startDate}
                    mode={'date'}
                    is24Hour={true}
                    onChange={(_, selectedDate: any) => {
                      const currentDate = selectedDate;
                      setStartDate(currentDate);
                    }}
                  />
                </View>
                <View
                  flexDirection="row"
                  alignItems="center"
                  mt="2"
                  justifyContent="space-between">
                  <FormControl.Label>{'结束时间'}</FormControl.Label>
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={endDate}
                    mode={'date'}
                    is24Hour={true}
                    onChange={(_, selectedDate: any) => {
                      const currentDate = selectedDate;
                      setEndDate(currentDate);
                    }}
                  />
                </View>
              </FormControl>
            </>
          )}
          {isCreateVote && (
            <>
              <FormControl>
                <FormControl.Label>{'投票标题'}</FormControl.Label>
                <Input
                  placeholder={'请输入投票标题'}
                  w="100%"
                  value={title}
                  onChangeText={val => setTitle(val)}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>{'发起原因'}</FormControl.Label>
                {/* @ts-ignore */}
                <TextArea
                  aria-label="t1"
                  numberOfLines={4}
                  placeholder={'请输入发起原因'}
                  // isInvalid
                  _dark={{
                    placeholderTextColor: 'gray.300',
                  }}
                  mb="5"
                  value={content}
                  onChangeText={val => setContent(val)}
                />
              </FormControl>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => {
                resetForm();
                onClose();
              }}>
              取消
            </Button>
            <Button
              onPress={() => {
                onConfirm?.();
                resetForm();
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
