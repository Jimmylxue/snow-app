import {
  Button,
  FormControl,
  Input,
  Modal,
  TextArea,
  Toast,
} from 'native-base';
import { useEffect, useState } from 'react';
import { useReactQuery } from '../../../config/react-query';
import {
  TCourseType,
  useAddCourseType,
  useEditCourseType,
} from '../../../service/course';
import {
  TExamType,
  useAddExamType,
  useEditExamType,
} from '../../../service/exam';

export type THandleType =
  | 'createClub'
  | 'createAnnouncement'
  | 'createActivity'
  | 'createVote';

type TProps = {
  type: 'add' | 'edit';
  showModal: boolean;
  onClose: () => void;
  examType: TExamType;
};

export function ExamTypeModal({ type, showModal, examType, onClose }: TProps) {
  const [name, setName] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const { queryClient } = useReactQuery();

  const resetForm = () => {
    setName('');
    setDesc('');
  };

  const { mutateAsync: addExamType } = useAddExamType({
    onSuccess() {
      Toast.show({ title: '操作成功' });
      queryClient.invalidateQueries('examType');
    },
  });

  const { mutateAsync: editExamType } = useEditExamType({
    onSuccess() {
      Toast.show({ title: '操作成功' });
      queryClient.invalidateQueries('examType');
    },
  });

  useEffect(() => {
    if (type === 'edit' && examType) {
      setName(examType.name);
      setDesc(examType.desc);
    }
  }, [type, examType]);

  const onConfirm = async () => {
    if (type === 'add') {
      await addExamType({
        name,
        desc,
      });
    } else {
      await editExamType({
        name,
        desc,
        id: examType.id,
      });
    }
  };

  return (
    <Modal isOpen={showModal} onClose={onClose}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>
          {type === 'add' ? '创建题目分类' : '修改题目分类'}
        </Modal.Header>
        <Modal.Body>
          <FormControl>
            <FormControl.Label>{'分类名称'}</FormControl.Label>
            <Input
              placeholder={'请输入分类名称'}
              w="100%"
              value={name}
              onChangeText={val => setName(val)}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>{'分类描述'}</FormControl.Label>
            {/* @ts-ignore */}
            <TextArea
              aria-label="t1"
              numberOfLines={4}
              placeholder={'请输入分类描述'}
              // isInvalid
              _dark={{
                placeholderTextColor: 'gray.300',
              }}
              mb="5"
              value={desc}
              onChangeText={val => setDesc(val)}
            />
          </FormControl>
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
