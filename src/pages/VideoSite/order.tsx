import { FlatList } from 'native-base';
import { memo } from 'react';
import { RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native';
import { useUserBuyCourse } from '../../service/course';
import CourseCard from './components/CourseCard';
import { adaptive } from '../../utils';
import { navigates } from '../../navigation/navigate';

export default memo(() => {
  const { data, isFetching, refetch } = useUserBuyCourse(
    ['orderList'],
    {
      current: 1,
      size: 5,
    },
    {},
  );

  return (
    <SafeAreaView>
      <FlatList
        h="full"
        data={data}
        keyExtractor={(_, index) => String(index)}
        numColumns={1}
        renderItem={({ item }) => (
          <CourseCard
            course={item.course}
            showMenu={false}
            onClick={() => {
              navigates('Video', {
                name: item.course.name,
                desc: item.course.desc,
                source: item.course.source,
                courseId: item.course.id,
              });
            }}
          />
        )}
        // onEndReached={() => {
        //   if (!isFetching && ) {
        //     console.log('ftechl ');
        //     fetchNextPage();
        //   }
        // }}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={refetch} />
        }
      />
    </SafeAreaView>
  );
});
