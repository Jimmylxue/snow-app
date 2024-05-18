import { Text, View } from 'native-base';
import { Player } from '../../components/Player';
import { adaptive } from '../../utils';
import { useRandomCourse } from '../../service/course';
import { ScrollView } from 'react-native';
import CourseCard from '../VideoSite/components/CourseCard';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/navigation';
import { useEffect, useState } from 'react';

type RouterParams = RouteProp<RootStackParamList, 'Video'>;

const VideoPlayer = () => {
  const { params } = useRoute<RouterParams>();
  const { data } = useRandomCourse(['randomCourse'], {}, {});

  const [videoLink, setVideoLink] = useState<string>('');

  useEffect(() => {
    if (params.source) {
      setVideoLink(params.source);
    }
  }, [params]);

  return (
    <View>
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
    </View>
  );
};

export default VideoPlayer;
