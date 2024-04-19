import { memo, useEffect, useState } from 'react';
import {
  Button,
  Divider,
  FormControl,
  Modal,
  Text,
  TextArea,
  Toast,
  View,
} from 'native-base';
import { SafeAreaView } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { navigates } from '../../navigation/navigate';
import { useSendFeedback, useSignInActivity } from '../../service/club';
import ActivityDetailCard from './components/ActivityDetailCard';

type RouterParams = RouteProp<RootStackParamList, 'ClubActivityDetail'>;

/**
 * 社团活动详情
 */
export default memo(() => {
  const { params } = useRoute<RouterParams>();
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [content, setContent] = useState<string>('');

  const { mutateAsync } = useSignInActivity({
    onSuccess() {
      Toast.show({
        title: '你已成功签到',
      });
    },
  });

  const { mutateAsync: sendFeedback } = useSendFeedback({
    onSuccess() {
      Toast.show({
        title: '反馈提交成功',
      });
    },
  });

  useEffect(() => {
    navigation.setOptions({
      title: params.activity.name,
    });
  }, [params, navigation]);

  return (
    <SafeAreaView>
      <View flexDirection="column" position="relative" pb="12" h="full">
        <ActivityDetailCard
          name={params.activity.name}
          desc={params.activity.desc}
          createTime={params.activity.createdTime}
          onJoinActivity={async () => {
            await mutateAsync({
              clubActivityId: params.activity.clubActivityId,
              clubId: params.activity.clubId,
            });
          }}
          isManager={!!params.isManager}
          onRefund={() => {
            setShowModal(true);
          }}
        />

        <View position="absolute" bottom="0" h="12">
          <Divider />
          <View flexDir="row" bg="white" h="full">
            <View w="1/2" h="full" justifyContent="center" alignItems="center">
              <TouchableOpacity
                containerStyle={{
                  width: '100%',
                }}
                onPress={() => {
                  navigates('SignInRecord', {
                    clubId: params.clubId,
                    activity: params.activity,
                  });
                }}>
                <View
                  w="full"
                  h="full"
                  justifyContent="center"
                  alignItems="center">
                  <Text>签到记录</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View w="1/2" h="full" justifyContent="center" alignItems="center">
              <TouchableOpacity
                containerStyle={{
                  width: '100%',
                }}
                onPress={() => {
                  navigates('FeedbackRecord', {
                    clubId: params.clubId,
                    activity: params.activity,
                  });
                }}>
                <View
                  w="full"
                  h="full"
                  justifyContent="center"
                  alignItems="center">
                  <Text>反馈记录</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>提交反馈</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>{'反馈内容'}</FormControl.Label>
              {/* @ts-ignore */}
              <TextArea
                aria-label="t1"
                numberOfLines={4}
                placeholder={'请输入反馈内容'}
                // isInvalid
                _dark={{
                  placeholderTextColor: 'gray.300',
                }}
                mb="5"
                value={content}
                onChangeText={val => setContent(val)}
              />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setContent('');
                  setShowModal(false);
                }}>
                取消
              </Button>
              <Button
                onPress={async () => {
                  await sendFeedback({
                    clubActivityId: params.activity.clubActivityId,
                    clubId: params.activity.clubId,
                    content,
                  });
                  setContent('');
                  setShowModal(false);
                }}>
                确定
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </SafeAreaView>
  );
});
