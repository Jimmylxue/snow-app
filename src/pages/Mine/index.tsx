import { memo } from 'react';
import { Text, Box, View, Avatar, Button, Image } from 'native-base';
import { InfoLine } from '../../components/InfoLine';
import { useAppState } from '../../hooks/useAppState';

export default memo(() => {
  const { state } = useAppState();
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
        <Image
          position="absolute"
          right={2}
          top={12}
          source={require('../../images/entry-message.png')}
          alt="Alternate Text"
          width={7}
          height={7}
        />
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
                管理员
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View px="2" pt="3">
        <View bg="white" px={2} rounded="md">
          <InfoLine
            right
            icon={require('../../images/home.png')}
            title="隐私政策"
            onPress={() => {
              // navigation.navigate('PrivacyClause')
            }}
          />
        </View>

        <Button shadow={2} onPress={() => console.log('hello world')} mt="4">
          退出登录
        </Button>
      </View>
    </Box>
  );
});
