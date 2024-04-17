import { memo, useState } from 'react';
import {
  Box,
  Button,
  Divider,
  Input,
  Stack,
  Text,
  TextArea,
  Toast,
} from 'native-base';
import { SafeAreaView } from 'react-native';
import { useWritePosts } from '../../service/club';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/navigation';
import { useReactQuery } from '../../config/react-query';
type RouterParams = RouteProp<RootStackParamList, 'ClubDetail'>;
export default memo(() => {
  const { queryClient } = useReactQuery();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const { params } = useRoute<RouterParams>();
  const navigation = useNavigation();
  const { mutateAsync } = useWritePosts({
    onSuccess() {
      Toast.show({
        title: '发布成功',
      });
      queryClient.invalidateQueries('postsList');
      navigation.goBack();
    },
  });

  return (
    <SafeAreaView>
      <Box alignItems="center" w="100%" h="full" bg="#FFF">
        <Stack space={2.5} w="full" px={2} mt="2">
          <Box>
            <Text mb="4" bold fontSize="lg">
              标题
            </Text>
            <Input
              placeholder="好的标题能让更多人看到"
              w="100%"
              value={title}
              onChangeText={val => setTitle(val)}
            />
            <Divider />
          </Box>
          <Box>
            <Text mb="4" bold fontSize="lg">
              内容
            </Text>
            {/* @ts-ignore */}
            <TextArea
              aria-label="t1"
              numberOfLines={4}
              placeholder="大胆说出你想说的吧"
              // isInvalid
              _dark={{
                placeholderTextColor: 'gray.300',
              }}
              mb="5"
              value={content}
              onChangeText={val => setContent(val)}
            />
            <Divider />
          </Box>
          <Button
            onPress={async () => {
              await mutateAsync({
                title,
                content,
                clubId: params.clubId,
              });
            }}>
            发布帖子
          </Button>
        </Stack>
      </Box>
    </SafeAreaView>
  );
});
