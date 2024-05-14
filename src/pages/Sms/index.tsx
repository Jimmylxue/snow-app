import { memo, useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { navigates } from '../../navigation/navigate';
import { useSms } from '../../utils/sms';
import MessageCard from './component/MessageCard';
import { useSmsList } from '../../service/useSms';
import { RefreshControl, TouchableOpacity } from 'react-native';
import { TSmsItem } from '../../navigation/navigation';
import {
  Button,
  FormControl,
  InfoIcon,
  Modal,
  SearchIcon,
  Text,
  TextArea,
  Toast,
  View,
} from 'native-base';
import { useAppState } from '../../hooks/useAppState';
import { useNavigation } from '@react-navigation/native';

export default memo(() => {
  const { smsList } = useSms();
  const { data, isFetching, refetch } = useSmsList(['smsList'], {}, {});
  const navigation = useNavigation();

  const [pageData, setPageData] = useState<TSmsItem[]>([]);

  const { state, signOut } = useAppState();

  const [modalShow, setModalShow] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    const mockData = (data || []).map(it => ({ body: it, address: '123456' }));
    setPageData([...smsList, ...mockData]);
  }, [smsList, data]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            setModalShow(true);
          }}>
          <View pl={2}>
            <InfoIcon />
          </View>
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={refetch} />
        }>
        <View
          justifyContent="flex-end"
          flexDirection="row"
          w="full"
          pr={3}
          mt={3}>
          <Text fontSize="md" ml="2">
            你好，{state.userInfo?.username}
          </Text>
          <TouchableOpacity
            onPress={() => {
              signOut?.();
            }}>
            <Text fontSize="md" ml="2" color="#5296d5">
              退出登录
            </Text>
          </TouchableOpacity>
        </View>
        {pageData?.map((item, index) => (
          <MessageCard
            key={index}
            info={item}
            onSeeDetail={async () => {
              navigates('SmsDetail', {
                message: item,
                showAddBlack: true,
              });
            }}
          />
        ))}
      </ScrollView>
      <Modal isOpen={modalShow} onClose={() => setModalShow(false)}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>短信检测</Modal.Header>
          <Modal.Body>
            <FormControl mt="3">
              <FormControl.Label>内容</FormControl.Label>
              {/* @ts-ignore */}
              <TextArea
                aria-label="t1"
                numberOfLines={4}
                placeholder="输入短信内容"
                // isInvalid
                _dark={{
                  placeholderTextColor: 'gray.300',
                }}
                mb="5"
                value={inputValue}
                onChangeText={val => setInputValue(val)}
              />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setModalShow(false);
                }}>
                取消
              </Button>
              <Button
                onPress={() => {
                  if (!inputValue) {
                    Toast.show({
                      title: '请输入短信内容',
                    });
                    return;
                  }
                  setModalShow(false);
                  navigates('SmsDetail', {
                    message: { body: inputValue, address: 'local_input' },
                    showAddBlack: true,
                  });
                }}>
                确定
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
});
