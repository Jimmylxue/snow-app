import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Alert,
} from 'react-native';
import { View, Text } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import { navigates } from '../../navigation/navigate';
import {
  EStudyRoomType,
  useAllStudyRoom,
  useJoinStudyRoom,
} from '../../service/study';

const StudyRoomList = () => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  const { data: studyRoomList } = useAllStudyRoom(
    ['studyRoomList'],
    {},
    {
      enabled: true,
    },
  );

  const { mutate: joinStudyRoom } = useJoinStudyRoom();

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const RoomCard = ({
    title,
    description,
    type,
    time = '',
    id,
    studyTime,
    endTime,
  }: {
    title: string;
    description: string;
    type: EStudyRoomType;
    time?: string;
    id: number;
    studyTime?: string;
    endTime?: string;
  }) => (
    <Animated.View style={[styles.cardContainer, { opacity: fadeAnim }]}>
      <LinearGradient
        colors={
          type === EStudyRoomType.自由自习室
            ? ['#E8F5E9', '#C8E6C9']
            : ['#E3F2FD', '#BBDEFB']
        }
        style={styles.card}>
        <View style={styles.cardContent}>
          <Text fontWeight="bold" fontSize="lg">
            {title}
          </Text>
          <Text style={styles.cardDescription}>{description}</Text>
          {time && <Text style={styles.timeText}>{time}</Text>}
          <TouchableOpacity
            style={[
              styles.enterButton,
              {
                backgroundColor:
                  type === EStudyRoomType.自由自习室 ? '#2E7D32' : '#1565C0',
              },
            ]}
            onPress={async () => {
              // 当当前的小时 不在 startTime 和 endTime 之间时，提示用户当前不在自习室开放时间
              if (type === EStudyRoomType.统一自习室) {
                const currentHour = new Date().getHours();
                if (currentHour < +studyTime! || currentHour > +endTime!) {
                  Alert.alert('提示', '当前不在自习室开放时间');
                  return;
                }
              }
              await joinStudyRoom({ studyRoomId: id });
              navigates('StudyRoom', {
                studyRoomId: id,
              });
            }}>
            <Text style={styles.buttonText}>进入自习室</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#FFFFFF', '#F5F5F5']} style={styles.background}>
        <View flexDirection="row" justifyContent="center" alignItems="center">
          <Text mt={4} fontSize="2xl" fontWeight="bold">
            选择自习室
          </Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {studyRoomList?.map(room => (
            <RoomCard
              key={room.id}
              title={
                room.studyRoomType === EStudyRoomType.自由自习室
                  ? '自由自习室'
                  : '统一自习室'
              }
              description={
                room.studyRoomType === EStudyRoomType.自由自习室
                  ? '随时进入，自由学习'
                  : room.openTime + ' - ' + room.closeTime + '时段可学习'
              }
              type={room.studyRoomType}
              studyTime={room.openTime}
              endTime={room.closeTime}
              id={room.id}
            />
          ))}

          <View flexDirection="row" justifyContent="center" alignItems="center">
            <TouchableOpacity
              onPress={() => {
                navigates('StudyRank', undefined);
              }}>
              <Text>查看学习排行版</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    paddingTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  scrollContent: {
    padding: 16,
  },
  cardContainer: {
    marginBottom: 20,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  card: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  cardContent: {
    padding: 20,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 12,
    color: '#333',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
  timeText: {
    fontSize: 14,
    color: '#1565C0',
    marginTop: 8,
    fontWeight: '500',
  },
  enterButton: {
    marginTop: 16,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 2,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default StudyRoomList;
