import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, Image, Menu, Pressable, HamburgerIcon } from 'native-base';
import { adaptive, baseFormatTime } from '../../../utils';
import { TCourseItem } from '../../../service/course';
type TProps = {
  course: TCourseItem;
  isManager?: boolean;
  showMenu: boolean;
  onClick: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

const CourseCard = ({
  course,
  showMenu,
  onClick,
  onEdit,
  onDelete,
}: TProps) => {
  return (
    <TouchableOpacity onPress={onClick}>
      <View flexDirection="row" bg="#FFF" p={2} mx={3} mt={3}>
        <Image
          source={{
            uri: course.cover,
          }}
          alt="Alternate Text"
          size="md"
        />
        <View px={2}>
          <View
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center">
            <Text fontWeight="semibold" fontSize="md" w={adaptive(1200)}>
              {course.name}
            </Text>
            {showMenu && (
              <Menu
                w="190"
                trigger={triggerProps => {
                  return (
                    <Pressable
                      accessibilityLabel="More options menu"
                      {...triggerProps}>
                      <HamburgerIcon />
                    </Pressable>
                  );
                }}>
                <Menu.Item onPress={onEdit}>编辑</Menu.Item>
                <Menu.Item onPress={onDelete}>删除</Menu.Item>
              </Menu>
            )}
          </View>

          <Text mt={1}>{course.desc}</Text>
          <Text fontSize="xs">{baseFormatTime(course.createTime)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CourseCard;
