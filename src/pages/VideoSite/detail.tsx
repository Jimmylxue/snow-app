import { memo, useEffect, useRef, useState } from 'react';
import { ScrollView, Toast, View } from 'native-base';
import { SafeAreaView } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/navigation';
import { TCourseItem, useDelCourse, useTypeCourse } from '../../service/course';
import CourseCard from './components/CourseCard';
import { navigates } from '../../navigation/navigate';
import { CourseModal } from './components/CourseModal';

type RouterParams = RouteProp<RootStackParamList, 'CourseTypeDetail'>;

/**
 * 某个分类下的视频列表
 */
export default memo(() => {
  const { params } = useRoute<RouterParams>();
  const navigation = useNavigation();
  const { data, refetch } = useTypeCourse(
    ['course'],
    {
      typeId: params.id,
    },
    {
      enabled: !!params.id,
    },
  );

  const [visible, setVisible] = useState<boolean>(false);
  const chooseCourse = useRef<TCourseItem>();

  const { mutateAsync } = useDelCourse({
    onSuccess: () => {
      Toast.show({ title: '操作成功' });
      refetch();
    },
  });

  useEffect(() => {
    navigation.setOptions({
      title: params.typeName,
    });
  }, [params, navigation]);

  return (
    <SafeAreaView>
      <View flexDirection="column" position="relative" h="full">
        <ScrollView>
          {data?.map(course => (
            <CourseCard
              course={course}
              key={course.id}
              showMenu={!!params.isManager}
              onClick={() =>
                navigates('Video', {
                  name: course.name,
                  desc: course.desc,
                  source: course.source,
                })
              }
              onEdit={() => {
                chooseCourse.current = course;
                setVisible(true);
              }}
              onDelete={async () => {
                await mutateAsync({ id: course.id });
              }}
            />
          ))}
        </ScrollView>
      </View>
      <CourseModal
        type="edit"
        course={chooseCourse.current!}
        showModal={visible}
        onClose={() => {
          setVisible(false);
        }}
      />
    </SafeAreaView>
  );
});
