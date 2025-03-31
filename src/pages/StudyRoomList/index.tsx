import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { navigates } from '../../navigation/navigate';

const { width } = Dimensions.get('window');

const StudyRoomList = () => {
  const navigation = useNavigation();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const RoomCard = ({ title, description, type, time = null }) => (
    <Animated.View style={[styles.cardContainer, { opacity: fadeAnim }]}>
      <LinearGradient
        colors={
          type === 'free' ? ['#E8F5E9', '#C8E6C9'] : ['#E3F2FD', '#BBDEFB']
        }
        style={styles.card}>
        <View style={styles.cardContent}>
          {/* <Icon
            name={type === 'free' ? 'desk' : 'clock-outline'}
            size={32}
            color={type === 'free' ? '#2E7D32' : '#1565C0'}
          /> */}
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardDescription}>{description}</Text>
          {time && <Text style={styles.timeText}>{time}</Text>}
          <TouchableOpacity
            style={[
              styles.enterButton,
              { backgroundColor: type === 'free' ? '#2E7D32' : '#1565C0' },
            ]}
            onPress={() => {
              // 处理进入自习室的逻辑
              navigates('StudyRoom', {
                type: type,
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
        <Text style={styles.header}>选择自习室</Text>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <RoomCard
            title="自由自习室"
            description="随时进入，自由学习"
            type="free"
          />
          <RoomCard
            title="统一自习室"
            description="固定时间段学习"
            type="scheduled"
            time="开放时间：09:00 - 21:00"
          />
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
