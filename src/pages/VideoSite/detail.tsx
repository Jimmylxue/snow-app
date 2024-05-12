import { memo, useEffect } from 'react';
import { ScrollView, Toast, View } from 'native-base';
import { SafeAreaView } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/navigation';
import { useJoinActivity } from '../../service/club';
import { useTypeCourse } from '../../service/course';
import CourseCard from './components/ActivityCard';

type RouterParams = RouteProp<RootStackParamList, 'CourseTypeDetail'>;

/**
 * 社团详情
 */
export default memo(() => {
  const { params } = useRoute<RouterParams>();
  const navigation = useNavigation();
  const { data } = useTypeCourse(
    ['clubActivity'],
    {
      typeId: params.id,
    },
    {
      enabled: !!params.id,
    },
  );

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
              isManager={!!params.isManager}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
});
