import {
  Button,
  CheckIcon,
  FormControl,
  Image,
  Input,
  Select,
  Toast,
  View,
} from 'native-base';
import { SafeAreaView } from 'react-native';
import { chooseSystemFile, handleUpload } from '../../../utils/upload';
import { useState } from 'react';
import { useAddCourse, useCourseType } from '../../../service/course';
import { adaptive } from '../../../utils';

export function UploadVideo() {
  const [typeId, setTypeId] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const [cover, setCover] = useState<string>(
    'https://wallpaperaccess.com/full/317501.jpg',
  );
  const [source, setSource] = useState<string>(
    'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  );

  const { data } = useCourseType(['course'], {}, {});

  const { mutateAsync } = useAddCourse({
    onSuccess: () => {
      setTypeId('');
      setName('');
      setDesc('');
      setCover('');
      setSource('');
    },
  });

  const chooseFile = async () => {
    try {
      const file = await chooseSystemFile('video');
      if (file) {
        handleUpload(file);
      }
    } catch (err) {
      console.error('打开文件选择界面失败:', err);
    }
  };

  return (
    <SafeAreaView>
      <View
        px={2}
        style={{
          paddingTop: adaptive(220),
        }}>
        <FormControl>
          <FormControl.Label>{'课程名称'}</FormControl.Label>
          <Input
            placeholder={'请输入课程名称'}
            w="100%"
            value={name}
            onChangeText={val => setName(val)}
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>{'课程描述'}</FormControl.Label>
          <Input
            placeholder={'请输入课程描述'}
            w="100%"
            value={desc}
            onChangeText={val => setDesc(val)}
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>{'课程类型'}</FormControl.Label>
          <Select
            selectedValue={typeId}
            minWidth="200"
            accessibilityLabel="选择课程类型"
            placeholder="Choose Service"
            _selectedItem={{
              bg: 'teal.600',
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
            onValueChange={itemValue => setTypeId(itemValue)}>
            {data?.map(item => (
              <Select.Item
                key={item.id}
                label={item.name}
                value={String(item.id)}
              />
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <FormControl.Label>{'课程封面'}</FormControl.Label>
          <Input
            placeholder={'请输入封面图片链接'}
            w="100%"
            value={cover}
            onChangeText={val => setCover(val)}
          />
          <View flexDirection="row" mt={2}>
            <Image
              source={{
                uri: 'https://wallpaperaccess.com/full/317501.jpg',
              }}
              alt="Alternate Text"
              size="xl"
            />
            <Button>上传封面</Button>
          </View>
        </FormControl>
        <FormControl>
          <FormControl.Label>{'课程视频'}</FormControl.Label>
          <Input
            placeholder={'请输入课程视频链接'}
            w="100%"
            value={source}
            onChangeText={val => setSource(val)}
          />
          <View flexDirection="row" mt={2}>
            <Image
              source={{
                uri: 'https://wallpaperaccess.com/full/317501.jpg',
              }}
              alt="Alternate Text"
              size="xl"
            />
            <Button>上传视频</Button>
          </View>
        </FormControl>

        <Button
          onPress={async () => {
            await mutateAsync({
              name,
              desc,
              typeId: Number(typeId),
              cover,
              source,
            });
            Toast.show({ title: '上传成功' });
          }}
          mt={2}>
          上传课程
        </Button>
      </View>
    </SafeAreaView>
  );
}
