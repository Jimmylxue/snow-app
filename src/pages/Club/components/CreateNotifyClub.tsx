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
  useSendLetter,
} from '../../../service/club';
import { useReactQuery } from '../../../config/react-query';
import dayjs from 'dayjs';
import { baseFormatTime } from '../../../utils';

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
  const [showStartPicker, setShowStartDatePicker] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [showEndPicker, setShowEndDatePicker] = useState(false);
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

  const { mutateAsync: sendLetter } = useSendLetter({
    onSuccess(data) {
      Toast.show({ title: data });
    },
  });

  const isCreateClub = modalType === 'createClub';
  const isCreateActivity = modalType === 'createActivity';
  const isCreateAnnounce = modalType === 'createAnnouncement';
  const isCreateVote = modalType === 'createVote';

  const onConfirm = async () => {
    const startTime = dayjs(startDate).startOf('day').valueOf() / 1000;
    const endTime = dayjs(endDate).endOf('day').valueOf() / 1000;
    if (isCreateClub) {
      await addClub({ name: title, desc: content });
      return;
    }
    if (isCreateVote) {
      if (endTime < startTime) {
        Toast.show({ title: '请选择正确的时间' });
        return;
      }
      await launchVote({
        name: title,
        desc: content,
        voteStartTime: dayjs(startDate).startOf('day').valueOf() / 1000,
        voteEndTime: dayjs(endDate).endOf('day').valueOf() / 1000,
        clubId,
      });
      return;
    }
    if (isCreateActivity) {
      if (endTime < startTime) {
        Toast.show({ title: '请选择正确的时间' });
        return;
      }
      await addActivity({
        name: title,
        desc: content,
        clubId,
        signStartTime: dayjs(startDate).startOf('day').valueOf() / 1000,
        signEndTime: dayjs(endDate).endOf('day').valueOf() / 1000,
      });
      return;
    }
    if (isCreateAnnounce) {
      await sendLetter({
        clubId,
        title,
        content,
        platform: 2,
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
                  <Button
                    onPress={() => {
                      setShowStartDatePicker(true);
                    }}>
                    选择开始时间
                  </Button>
                  <FormControl.Label>
                    {baseFormatTime(startDate as any, false)}
                  </FormControl.Label>
                  {showStartPicker && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={startDate}
                      mode={'date'}
                      is24Hour={true}
                      onChange={(_, selectedDate: any) => {
                        const currentDate = selectedDate;
                        setStartDate(currentDate);
                        setShowStartDatePicker(false);
                      }}
                    />
                  )}
                </View>
                <View
                  flexDirection="row"
                  alignItems="center"
                  mt="2"
                  justifyContent="space-between">
                  <Button
                    onPress={() => {
                      setShowEndDatePicker(true);
                    }}>
                    选择结束时间
                  </Button>
                  <FormControl.Label>
                    {baseFormatTime(endDate as any, false)}
                  </FormControl.Label>
                  {showEndPicker && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={endDate}
                      mode={'date'}
                      is24Hour={true}
                      onChange={(_, selectedDate: any) => {
                        const currentDate = selectedDate;
                        setEndDate(currentDate);
                        setShowEndDatePicker(false);
                      }}
                    />
                  )}
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
              <FormControl>
                <View
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="space-between">
                  <Button
                    onPress={() => {
                      setShowStartDatePicker(true);
                    }}>
                    选择开始时间
                  </Button>
                  <FormControl.Label>
                    {baseFormatTime(startDate as any, false)}
                  </FormControl.Label>
                  {showStartPicker && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={startDate}
                      mode={'date'}
                      is24Hour={true}
                      onChange={(_, selectedDate: any) => {
                        const currentDate = selectedDate;
                        setStartDate(currentDate);
                        setShowStartDatePicker(false);
                      }}
                    />
                  )}
                </View>
                <View
                  flexDirection="row"
                  alignItems="center"
                  mt="2"
                  justifyContent="space-between">
                  <Button
                    onPress={() => {
                      setShowEndDatePicker(true);
                    }}>
                    选择结束时间
                  </Button>
                  <FormControl.Label>
                    {baseFormatTime(endDate as any, false)}
                  </FormControl.Label>
                  {showEndPicker && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={endDate}
                      mode={'date'}
                      is24Hour={true}
                      onChange={(_, selectedDate: any) => {
                        const currentDate = selectedDate;
                        setEndDate(currentDate);
                        setShowEndDatePicker(false);
                      }}
                    />
                  )}
                </View>
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
