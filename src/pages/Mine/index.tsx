import { memo } from 'react';
import { Text, Box, View, Avatar, Button } from 'native-base';
import { InfoLine } from '../../components/InfoLine';
import { useAppState } from '../../hooks/useAppState';
import { navigates } from '../../navigation/navigate';

export default memo(() => {
  const { state, signOut } = useAppState();
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
