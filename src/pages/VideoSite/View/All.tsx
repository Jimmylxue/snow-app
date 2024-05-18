import { ScrollView, TouchableOpacity } from 'react-native';
import CourseTypeCard from '../components/CourseTypeCard';
import {
  TCourseType,
  useCourseType,
  useDelCourseType,
} from '../../../service/course';
import { CourseTypeModal } from '../components/CourseTypeModal';
import { useEffect, useRef, useState } from 'react';
import { AddIcon, Toast, View } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useAppState } from '../../../hooks/useAppState';
import { ERoleType } from '../../../service';

export function AllVideo() {
  const { state } = useAppState();
  const isManager = state.userInfo?.role === ERoleType.管理员;
  const navigation = useNavigation();
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

  useEffect(() => {
    if (isManager) {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            onPress={() => {
              type.current = 'add';
              setVisible(true);
            }}>
            <View pr={2}>
              <AddIcon size="md" />
            </View>
          </TouchableOpacity>
        ),
      });
    }
  }, [navigation, isManager]);

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
            isManager={isManager}
          />
        ))}
      </ScrollView>
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
