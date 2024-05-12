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
import { TExamItem, useEditExamQuestion } from '../../../service/exam';

export type THandleType =
  | 'createClub'
  | 'createAnnouncement'
  | 'createActivity'
  | 'createVote';

type TProps = {
  type: 'add' | 'edit';
  showModal: boolean;
  onClose: () => void;
  examQuestion: TExamItem;
};

export function ExamQuestionModal({
  type,
  showModal,
  examQuestion,
  onClose,
}: TProps) {
  const [name, setName] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const { queryClient } = useReactQuery();

  const resetForm = () => {
    setName('');
    setDesc('');
  };

  // const { mutateAsync: addCourseType } = useAddCourseType({
  //   onSuccess() {
  //     Toast.show({ title: '操作成功' });
  //     queryClient.invalidateQueries('courseType');
  //   },
  // });

  const { mutateAsync: editExamQuestion } = useEditExamQuestion({
    onSuccess() {
      Toast.show({ title: '操作成功' });
      queryClient.invalidateQueries('examList');
    },
  });

  useEffect(() => {
    if (type === 'edit' && examQuestion) {
      setName(examQuestion.name);
      setDesc(examQuestion.desc);
    }
  }, [type, examQuestion]);

  const onConfirm = async () => {
    if (type === 'add') {
      // await addCourseType({
      //   name,
      //   desc,
      // });
    } else {
      await editExamQuestion({
        name,
        desc,
        id: examQuestion.id,
      });
    }
  };

  return (
    <Modal isOpen={showModal} onClose={onClose}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>
          {type === 'add' ? '创建考试分类' : '修改题目'}
        </Modal.Header>
        <Modal.Body>
          <FormControl>
            <FormControl.Label>{'题目名称'}</FormControl.Label>
            <Input
              placeholder={'请输入题目名称'}
              w="100%"
              value={name}
              onChangeText={val => setName(val)}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>{'题目描述'}</FormControl.Label>
            {/* @ts-ignore */}
            <TextArea
              aria-label="t1"
              numberOfLines={4}
              placeholder={'请输入题目描述'}
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
