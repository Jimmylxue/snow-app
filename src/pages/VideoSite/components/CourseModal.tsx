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
import { TCourseItem, useEditCourse } from '../../../service/course';

export type THandleType =
  | 'createClub'
  | 'createAnnouncement'
  | 'createActivity'
  | 'createVote';

type TProps = {
  type: 'add' | 'edit';
  showModal: boolean;
  onClose: () => void;
  course: TCourseItem;
};

export function CourseModal({ type, showModal, course, onClose }: TProps) {
  const [name, setName] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const [cover, setCover] = useState<string>('');
  const [source, setSource] = useState<string>('');
  const { queryClient } = useReactQuery();

  const resetForm = () => {
    setName('');
    setDesc('');
  };

  const { mutateAsync: editCourse } = useEditCourse({
    onSuccess() {
      Toast.show({ title: '操作成功' });
      queryClient.invalidateQueries('course');
    },
  });

  useEffect(() => {
    if (type === 'edit' && course) {
      setName(course.name);
      setDesc(course.desc);
      setCover(course.cover);
      setSource(course.source);
    }
  }, [type, course]);

  const onConfirm = async () => {
    if (type === 'add') {
      // await addCourseType({
      //   name,
      //   desc,
      // });
    } else {
      await editCourse({
        name,
        desc,
        source,
        cover,
        id: course.id,
      });
    }
  };

  return (
    <Modal isOpen={showModal} onClose={onClose}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>
          {type === 'add' ? '创建考试分类' : '修改课程'}
        </Modal.Header>
        <Modal.Body>
          <FormControl>
            <FormControl.Label>{'课程名称'}</FormControl.Label>
            <Input
              placeholder={'请输入课程名称'}
              w="100%"
              value={name}
              onChangeText={val => setName(val)}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>{'课程描述'}</FormControl.Label>
            {/* @ts-ignore */}
            <TextArea
              aria-label="t1"
              numberOfLines={4}
              placeholder={'请输入课程描述'}
              // isInvalid
              _dark={{
                placeholderTextColor: 'gray.300',
              }}
              mb="5"
              value={desc}
              onChangeText={val => setDesc(val)}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>{'封面图片链接'}</FormControl.Label>
            <Input
              placeholder={'请输入课程封面链接'}
              w="100%"
              value={cover}
              onChangeText={val => setCover(val)}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>{'课程视频链接'}</FormControl.Label>
            <Input
              placeholder={'请输入课程视频链接'}
              w="100%"
              value={source}
              onChangeText={val => setSource(val)}
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
