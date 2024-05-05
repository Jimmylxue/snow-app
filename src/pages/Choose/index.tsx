import { memo } from 'react';
import { Box, Pressable, HStack, Badge, Spacer, Text, View } from 'native-base';
import { SafeAreaView } from 'react-native';
import { resetNavigate } from '../../navigation/navigate';

export enum ERole {
  托运人,
  承运人,
}

export default memo(() => {
  return (
    <SafeAreaView>
      <View h="full" px="2" mt={2}>
        <Pressable
          mb={4}
          onPress={() => {
            resetNavigate({
              index: 0,
              // routes: [{ name: 'MainStack' }],
              routes: [{ name: 'MainStack', params: { role: ERole.托运人 } }],
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
                  托运人
                </Text>
                <Text mt="2" fontSize="sm" color="coolGray.700">
                  发布自己的托运需求，系统将为您匹配合适的承运人为您进行行李托运
                </Text>
              </Box>
            );
          }}
        </Pressable>
        <Pressable
          onPress={() => {
            console.log('check');
            resetNavigate({
              index: 0,
              // routes: [{ name: 'MainStack' }],
              routes: [{ name: 'MainStack', params: { role: ERole.承运人 } }],
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
                  承运人
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
