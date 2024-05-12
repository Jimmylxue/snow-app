import { ScrollView, TouchableOpacity } from 'react-native';
import CourseTypeCard from '../components/CourseTypeCard';
import {
  TCourseType,
  useCourseType,
  useDelCourseType,
} from '../../../service/course';
import { CourseTypeModal } from '../components/CourseTypeModal';
import { useRef, useState } from 'react';
import { Divider, Text, Toast, View } from 'native-base';

export function AllVideo() {
  const { data, refetch } = useCourseType(['courseType'], {});
  const [visible, setVisible] = useState<boolean>(false);
  const chooseCourseType = useRef<TCourseType>();
  const type = useRef<'add' | 'edit'>('add');

  const { mutateAsync } = useDelCourseType({
    onSuccess() {
      Toast.show({ title: '删除成功' });
      refetch();
    },
  });

  return (
    <>
      <ScrollView>
        {data?.map(courseType => (
          <CourseTypeCard
            key={courseType.id}
            name={courseType.name}
            desc={courseType.desc}
            clubId={courseType.id}
            onEdit={() => {
              type.current = 'edit';
              chooseCourseType.current = courseType;
              setVisible(true);
            }}
            onDelete={async () => {
              await mutateAsync({
                id: courseType.id,
              });
            }}
          />
        ))}
      </ScrollView>
      <View position="absolute" bottom="0" h="12">
        <Divider />
        <View flexDir="row" bg="white" h="full">
          <View w="full" h="full" justifyContent="center" alignItems="center">
            <TouchableOpacity
              onPress={() => {
                type.current = 'add';
                setVisible(true);
              }}>
              <View
                w="full"
                h="full"
                justifyContent="center"
                alignItems="center">
                <Text>新建分类</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <CourseTypeModal
        type={type.current}
        courseType={chooseCourseType.current!}
        showModal={visible}
        onClose={() => {
          setVisible(false);
        }}
      />
    </>
  );
}
