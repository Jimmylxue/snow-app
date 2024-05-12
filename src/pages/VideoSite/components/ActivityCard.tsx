import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text, Image } from 'native-base';
import { baseFormatTime } from '../../../utils';
import { TCourseItem } from '../../../service/course';
import { navigates } from '../../../navigation/navigate';
type TProps = {
  course: TCourseItem;
  isManager: boolean;
};

const CourseCard = ({ course, isManager }: TProps) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigates('Video', {
          name: course.name,
          desc: course.desc,
          source: course.source,
        });
      }}>
      <View flexDirection="row" bg="#FFF" p={2} mx={3} mt={3}>
        <Image
          source={{
            uri: course.cover,
          }}
          alt="Alternate Text"
          size="md"
        />
        <View px={2}>
          <Text fontWeight="semibold" fontSize="md">
            {course.name}
          </Text>
          <Text mt={1}>{course.desc}</Text>
          <Text fontSize="xs">{baseFormatTime(course.createTime)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    marginTop: 10,
  },
});

export default CourseCard;
