import { Button, Divider, ScrollView, Text, Toast, View } from 'native-base';
import { Player } from '../../components/Player';
import { adaptive } from '../../utils';
import {
  useBuyCourse,
  useCheckBuy,
  useRandomCourse,
} from '../../service/course';
import CourseCard from '../VideoSite/components/CourseCard';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/navigation';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';

type RouterParams = RouteProp<RootStackParamList, 'Video'>;

const VideoPlayer = () => {
  const { params } = useRoute<RouterParams>();
  const { data } = useRandomCourse(['randomCourse'], {}, {});
  const { data: checkHasBuy, refetch } = useCheckBuy(
    ['checkBuyCourse', params.courseId],
    {
      courseId: params.courseId,
    },
    {
      enabled: !!params.courseId,
    },
  );

  const { mutateAsync } = useBuyCourse({
    onSuccess: () => {
      Toast.show({ title: '购买成功' });
      refetch();
    },
  });

  const [videoLink, setVideoLink] = useState<string>('');

  useEffect(() => {
    if (params.source) {
      setVideoLink(params.source);
    }
  }, [params]);

  return (
    <SafeAreaView>
      <View h="full">
        <View
          key={videoLink}
          style={{
            height: adaptive(1080),
          }}>
          <Player videoLink={videoLink} />
        </View>
        <View px={2} pt={2}>
          <Text fontSize="lg" fontWeight="semibold">
            相关推荐
          </Text>
        </View>
        <ScrollView>
          {data?.map(course => (
            <CourseCard
              course={course}
              key={course.id}
              onClick={() => {
                setVideoLink(course.source);
              }}
              showMenu={false}
            />
          ))}
        </ScrollView>
        <View bottom="0" w="full" px="3">
          <Divider />
          {!checkHasBuy ? (
            <Button
              onPress={async () => {
                await mutateAsync({
                  courseId: params.courseId,
                });
              }}>
              立即购买
            </Button>
          ) : (
            <View flexDir="row" justifyContent="center">
              <Text>您已购买该课程</Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default VideoPlayer;
