import React from 'react';
import { StyleSheet } from 'react-native';
import {
  View,
  Text,
  Button,
  Menu,
  Pressable,
  HamburgerIcon,
} from 'native-base';
import { navigates } from '../../../navigation/navigate';
type TProps = {
  name: string;
  desc: string;
  clubId: number;
  onEdit: () => void;
  onDelete: () => void;
  isManager: boolean;
};

const CourseTypeCard = ({
  name,
  desc,
  clubId,
  onEdit,
  onDelete,
  isManager,
}: TProps) => {
  return (
    <View style={styles.card} mx={3} mt={3}>
      <View
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center">
        <Text style={styles.name}>{name}</Text>
        {isManager && (
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

      <Text style={styles.description}>{desc}</Text>

      <Button
        mt="2"
        onPress={() => {
          navigates('CourseTypeDetail', {
            id: clubId,
            typeName: name,
            isManager: isManager,
          });
        }}>
        进入分类
      </Button>
    </View>
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

export default CourseTypeCard;
