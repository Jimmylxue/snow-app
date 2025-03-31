import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { Text, View } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import { navigates } from '../../navigation/navigate';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

const subjects = [
  {
    name: '数学',
    colors: ['#4facfe', '#00f2fe'],
    icon: '📐',
  },
  {
    name: '英语',
    colors: ['#13547a', '#80d0c7'],
    icon: '📚',
  },
  {
    name: '政治',
    colors: ['#ff6b6b', '#ffc6c6'],
    icon: '📖',
  },
  {
    name: '评论区',
    colors: ['#667eea', '#764ba2'],
    icon: '💬',
  },
];

const phases = [
  {
    title: '基础阶段',
    description: '打好基础,稳步提升',
    colors: ['#fff6e5', '#ffe0b2'],
  },
  {
    title: '强化阶段',
    description: '查漏补缺,重点突破',
    colors: ['#e8f5e9', '#c8e6c9'],
  },
];

const Choose = ({ navigation }: { navigation: any }) => {
  const renderSubjectCard = (
    subject: typeof subjects[0],
    _index: number,
    index: number,
  ) => (
    <TouchableOpacity
      onPress={() => {
        if (subject.name === '评论区') {
          console.log('index', _index);
          navigates('ClubPosts', {
            clubId: 1,
            clubName: phases[_index].title + ' - 评论区',
          });
        } else {
          if (_index === 0) {
            navigates('ExamPage', {
              typeId: index + 1,
              title: phases[_index].title + ' - ' + subject.name,
            });
          } else {
            navigates('ExamPage', {
              typeId: 3 + index + 1,
              title: phases[_index].title + ' - ' + subject.name,
            });
          }
        }
      }}
      style={styles.cardContainer}>
      <LinearGradient
        colors={subject.colors}
        style={styles.subjectCard}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
        <Text fontSize="3xl" mb={2}>
          {subject.icon}
        </Text>
        <Text color="white" fontSize="lg" fontWeight="bold">
          {subject.name}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderPhaseSection = (phase: typeof phases[0], _index: number) => (
    <View style={styles.phaseContainer}>
      <LinearGradient
        colors={phase.colors}
        style={styles.phaseBanner}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}>
        <View>
          <Text fontSize="xl" fontWeight="bold" color="#333">
            {phase.title}
          </Text>
          <Text fontSize="sm" color="#666" mt={1}>
            {phase.description}
          </Text>
        </View>
      </LinearGradient>
      <View style={styles.subjectsGrid}>
        {subjects.map((subject, index) => (
          <React.Fragment key={index}>
            {renderSubjectCard(subject, _index, index)}
          </React.Fragment>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <LinearGradient colors={['#f6f7f8', '#ffffff']} style={styles.background}>
        <View style={styles.header}>
          <Text fontSize="3xl" fontWeight="bold" color="#333">
            考研 2027
          </Text>
          <Text color="#666" fontSize="md" mt={2}>
            今天也要努力学习哦～
          </Text>
        </View>

        {phases.map((phase, index) => (
          <React.Fragment key={index}>
            {renderPhaseSection(phase, index)}
          </React.Fragment>
        ))}
      </LinearGradient>
    </SafeAreaView>
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
    padding: 20,
    alignItems: 'center',
  },
  phaseContainer: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  phaseBanner: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  subjectsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardContainer: {
    width: CARD_WIDTH,
    marginBottom: 16,
  },
  subjectCard: {
    height: 140,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default Choose;
