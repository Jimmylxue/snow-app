import { memo } from 'react';
import { Text, Box, View, Avatar, Button, Image } from 'native-base';
import { InfoLine } from '../../components/InfoLine';
import { useAppState } from '../../hooks/useAppState';
import { TouchableOpacity } from 'react-native';
import { navigates } from '../../navigation/navigate';
import { ERoleType } from '../../service';

export default memo(() => {
  const { state, signOut } = useAppState();
  const isManager = state.userInfo?.role === ERoleType.管理员;
  return (
    <Box h="full" w="full">
      <View
        style={{
          height: 220,
        }}
        backgroundColor="#7171f6"
        flexDirection="row"
        px="2"
        position="relative"
        alignItems="center">
        {/* <View position="absolute" right={2} top={12}>
          <TouchableOpacity
            onPress={() => {
              navigates('Notice', undefined);
            }}>
            <Image
              source={require('../../images/entry-message.png')}
              alt="Alternate Text"
              width={7}
              height={7}
            />
          </TouchableOpacity>
        </View> */}

        <View>
          <View flexDir="row" alignItems="center">
            <Avatar
              size="lg"
              source={{
                uri: state.userInfo?.avatar,
              }}></Avatar>
            <View>
              <Text fontSize="lg" ml="2">
                {state.userInfo?.username}
              </Text>
              <Text ml="2" fontSize="xs" color="#f1c40f">
                {isManager ? '管理员' : '普通用户'}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View px="2" pt="3">
        <View bg="white" px={2} rounded="md">
          <InfoLine
            right
            icon={require('../../images/entry-message.png')}
            title="个人信息"
            onPress={() => {
              navigates('MemberInfo', undefined);
            }}
          />
          {/* <InfoLine
            right
            icon={require('../../images/entry-message.png')}
            title="消息中心"
            onPress={() => {
              navigates('Notice', undefined);
            }}
          /> */}
        </View>

        <Button
          shadow={2}
          onPress={() => {
            signOut?.();
          }}
          mt="4">
          退出登录
        </Button>
      </View>
    </Box>
  );
});
