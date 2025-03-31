import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { View } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import { navigates } from '../../navigation/navigate';

const { width } = Dimensions.get('window');

const ExamList = () => {
  const subjects = [
    { id: 1, name: '数学', colors: ['#FF9A9E', '#FAD0C4'] },
    { id: 2, name: '英语', colors: ['#A18CD1', '#FBC2EB'] },
    { id: 3, name: '政治', colors: ['#84FAB0', '#8FD3F4'] },
  ];

  const handleSubjectPress = (subjectName: string) => {
    // TODO: 处理科目选择逻辑
    navigates('Exam', { subject: subjectName });
    console.log('Selected subject:', subjectName);
  };

  return (
    <LinearGradient colors={['#fff', '#f7f7f7']} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>请选择科目进行考试</Text>
        <Text style={styles.subtitle}>每场考试三小时</Text>
      </View>

      <View style={styles.subjectsContainer}>
        {subjects.map(subject => (
          <TouchableOpacity
            key={subject.id}
            onPress={() => handleSubjectPress(subject.name)}>
            <View mt={4}>
              <LinearGradient
                colors={subject.colors}
                style={styles.subjectCard}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}>
                <Text style={styles.subjectName}>{subject.name}</Text>
              </LinearGradient>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginTop: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
  },
  subjectsContainer: {
    gap: 20,
  },
  subjectCard: {
    width: width - 40,
    height: 120,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  subjectName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default ExamList;
