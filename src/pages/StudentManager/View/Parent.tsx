import {
  AddIcon,
  Avatar,
  Button,
  Divider,
  HamburgerIcon,
  Menu,
  Pressable,
  Text,
  Toast,
  View,
} from 'native-base';
import { useState } from 'react';
import { SelectTimeModal } from '../components/SelectTimeModal';
import { useAppState } from '../../../hooks/useAppState';
import { ERoleType } from '../../../service';
import { TouchableOpacity } from 'react-native';
import { BindChildrenModal } from '../components/BindChildrenModal';
import { navigates } from '../../../navigation/navigate';
import { callPhone } from '../../../utils/util';
import {
  TSleepTime,
  useChildList,
  useUnBindChild,
} from '../../../service/studentManager';
import { useReactQuery } from '../../../config/react-query';

type TProps = {
  sleepInfo: TSleepTime;
};

export function Parent({ sleepInfo }: TProps) {
  const { state, signOut } = useAppState();
  const { data } = useChildList(['childrenList'], {}, {});
  const { queryClient } = useReactQuery();
  const [visible, setVisible] = useState(false);
  const isManager = state.userInfo?.role === ERoleType.管理员;
  const [bingVisible, setBindVisible] = useState(false);
  const { mutateAsync } = useUnBindChild({
    onSuccess: () => {
      Toast.show({
        title: '解绑成功',
      });
      queryClient.invalidateQueries('childrenList');
    },
  });

  return (
    <>
      <View>
        <Button
          onPress={() => {
            setVisible(true);
          }}>
          修改时间
        </Button>
        <Divider my={3} />

        <View>
          <View
            flexDir="row"
            justifyContent="space-between"
            alignItems="center">
            <Text fontSize="md" fontWeight="semibold" mb={2}>
              孩子账号
            </Text>
            <TouchableOpacity
              onPress={() => {
                setBindVisible(true);
              }}>
              <AddIcon />
            </TouchableOpacity>
          </View>

          <View>
            {data?.map(child => (
              <View
                flexDir="row"
                mb={3}
                key={child.id}
                justifyContent="space-between"
                alignItems="center">
                <View flexDir="row" alignItems="center">
                  <Avatar
                    size="md"
                    source={{
                      uri: child?.children?.avatar,
                    }}></Avatar>
                  <View>
                    <Text fontSize="md" ml="2">
                      {child?.children?.username}
                    </Text>
                    {/* {isManager && (
                    <Text ml="2" fontSize="xs" color="#f1c40f">
                      管理员
                    </Text>
                  )} */}
                  </View>
                </View>
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
                  <Menu.Item
                    onPress={() => {
                      callPhone('1990576109');
                    }}>
                    紧急呼叫
                  </Menu.Item>
                  <Menu.Item
                    onPress={() => {
                      navigates('PositionRecord', { userId: child.childrenId });
                    }}>
                    查看位置
                  </Menu.Item>
                  <Menu.Item
                    onPress={async () => {
                      await mutateAsync({
                        childrenId: child.childrenId,
                      });
                    }}>
                    解绑
                  </Menu.Item>
                </Menu>
              </View>
            ))}
          </View>
        </View>

        <SelectTimeModal
          visible={visible}
          onClose={() => {
            setVisible(false);
          }}
          startTime={sleepInfo?.disabledStartHour}
          endTime={sleepInfo?.disabledEndHour}
        />

        <BindChildrenModal
          visible={bingVisible}
          onClose={() => {
            setBindVisible(false);
          }}
        />
      </View>
    </>
  );
}
