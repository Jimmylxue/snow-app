import { memo, useEffect, useState } from 'react';
import {
  Button,
  Divider,
  FormControl,
  Input,
  Modal,
  ScrollView,
  TextArea,
  View,
} from 'native-base';
import { SafeAreaView } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/navigation';
import PostCard from './components/PostCard';
import { navigates } from '../../navigation/navigate';
import PostComment from './components/PostComment';

type RouterParams = RouteProp<RootStackParamList, 'ClubDetail'>;

export default memo(() => {
  const { params } = useRoute<RouterParams>();
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState<string>('');

  return (
    <SafeAreaView>
      <View flexDirection="column" position="relative" pb="12" h="full">
        <PostCard
          name="友谊赛"
          desc="和隔壁学校的同学组织一场友谊赛"
          hideShowLove
          withOutMargin
        />
        <ScrollView>
          <PostComment name="友谊赛" desc="和隔壁学校的同学组织一场友谊赛" />
          <PostComment name="友谊赛" desc="和隔壁学校的同学组织一场友谊赛" />
          <PostComment name="友谊赛" desc="和隔壁学校的同学组织一场友谊赛" />
          <PostComment name="友谊赛" desc="和隔壁学校的同学组织一场友谊赛" />
          <PostComment name="友谊赛" desc="和隔壁学校的同学组织一场友谊赛" />
          <PostComment name="友谊赛" desc="和隔壁学校的同学组织一场友谊赛" />
        </ScrollView>

        <View position="absolute" bottom="0" h="12" w="full" px="3">
          <Divider />
          <Button
            onPress={() => {
              setShowModal(true);
            }}>
            我也说说
          </Button>
        </View>
      </View>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>发布评论</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>评论内容</FormControl.Label>
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
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowModal(false);
                }}>
                取消
              </Button>
              <Button
                onPress={() => {
                  setShowModal(false);
                }}>
                发布
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </SafeAreaView>
  );
});
