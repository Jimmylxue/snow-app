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

export type THandleType =
  | 'createClub'
  | 'createAnnouncement'
  | 'createActivity'
  | 'createVote';

type TProps = {
  type: 'add' | 'edit';
  showModal: boolean;
  onClose: () => void;
  courseType: TCourseType;
};

export function CourseTypeModal({
  type,
  showModal,
  courseType,
  onClose,
}: TProps) {
  const [name, setName] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const { queryClient } = useReactQuery();

  const resetForm = () => {
    setName('');
    setDesc('');
  };

  const { mutateAsync: addCourseType } = useAddCourseType({
    onSuccess() {
      Toast.show({ title: '操作成功' });
      queryClient.invalidateQueries('courseType');
    },
  });

  const { mutateAsync: editCourseType } = useEditCourseType({
    onSuccess() {
      Toast.show({ title: '操作成功' });
      queryClient.invalidateQueries('courseType');
    },
  });

  useEffect(() => {
    if (type === 'edit' && courseType) {
      setName(courseType.name);
      setDesc(courseType.desc);
    }
  }, [type, courseType]);

  const onConfirm = async () => {
    if (type === 'add') {
      await addCourseType({
        name,
        desc,
      });
    } else {
      await editCourseType({
        name,
        desc,
        id: courseType.id,
      });
    }
  };

  return (
    <Modal isOpen={showModal} onClose={onClose}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>
          {type === 'add' ? '创建视频分类' : '修改视频分类'}
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
