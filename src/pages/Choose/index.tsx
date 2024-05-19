import { memo, useEffect } from 'react';
import { Box, Pressable, HStack, Badge, Spacer, Text, View } from 'native-base';
import { SafeAreaView } from 'react-native';
import { resetNavigate } from '../../navigation/navigate';
import { useAppState } from '../../hooks/useAppState';
import { ERoleType, useUpdateUser } from '../../service';

export enum ERole {
  托运人,
  承运人,
}

export default memo(() => {
  const { state, updateUserInfo } = useAppState();

  const { mutateAsync } = useUpdateUser();

  useEffect(() => {
    if (state.userInfo?.role !== ERoleType.未定义) {
      console.log('state.userInfo.role', state.userInfo?.role);
      resetNavigate({
        index: 0,
        routes: [{ name: 'MainStack' }],
      });
    }
  }, [state]);

  return (
    <SafeAreaView>
      <View h="full" px="2" mt={2}>
        <Pressable
          mb={4}
          onPress={async () => {
            await mutateAsync({
              role: ERoleType.管理员,
            });
            if (state.userInfo) {
              await updateUserInfo?.({
                ...state.userInfo,
                role: ERoleType.管理员,
              });
            }
            await resetNavigate({
              index: 0,
              routes: [{ name: 'MainStack' }],
            });
          }}>
          {({ isHovered, isFocused, isPressed }) => {
            return (
              <Box
                borderWidth="1"
                borderColor="coolGray.300"
                shadow="3"
                bg={
                  isPressed
                    ? 'coolGray.200'
                    : isHovered
                    ? 'coolGray.200'
                    : 'coolGray.100'
                }
                p="5"
                rounded="8"
                style={{
                  transform: [
                    {
                      scale: isPressed ? 0.96 : 1,
                    },
                  ],
                }}>
                <HStack alignItems="center">
                  <Badge
                    colorScheme="darkBlue"
                    _text={{
                      color: 'white',
                    }}
                    variant="solid"
                    rounded="4">
                    角色1
                  </Badge>
                  <Spacer />
                </HStack>
                <Text
                  color="coolGray.800"
                  mt="3"
                  fontWeight="medium"
                  fontSize="xl">
                  管理员
                </Text>
                <Text mt="2" fontSize="sm" color="coolGray.700">
                  发布自己的托运需求，系统将为您匹配合适的承运人为您进行行李托运
                </Text>
              </Box>
            );
          }}
        </Pressable>
        <Pressable
          onPress={async () => {
            await mutateAsync({
              role: ERoleType.普通用户,
            });
            if (state.userInfo) {
              await updateUserInfo?.({
                ...state.userInfo,
                role: ERoleType.普通用户,
              });
            }
            resetNavigate({
              index: 0,
              routes: [{ name: 'MainStack' }],
            });
          }}>
          {({ isHovered, isFocused, isPressed }) => {
            return (
              <Box
                borderWidth="1"
                borderColor="coolGray.300"
                shadow="3"
                bg={
                  isPressed
                    ? 'coolGray.200'
                    : isHovered
                    ? 'coolGray.200'
                    : 'coolGray.100'
                }
                p="5"
                rounded="8"
                style={{
                  transform: [
                    {
                      scale: isPressed ? 0.96 : 1,
                    },
                  ],
                }}>
                <HStack alignItems="center">
                  <Badge
                    colorScheme="darkBlue"
                    _text={{
                      color: 'white',
                    }}
                    variant="solid"
                    rounded="4">
                    角色2
                  </Badge>
                  <Spacer />
                </HStack>
                <Text
                  color="coolGray.800"
                  mt="3"
                  fontWeight="medium"
                  fontSize="xl">
                  普通用户
                </Text>
                <Text mt="2" fontSize="sm" color="coolGray.700">
                  输入您的车辆信息，系统将为您匹配合适的行李订单给您
                </Text>
              </Box>
            );
          }}
        </Pressable>
      </View>
    </SafeAreaView>
  );
});
