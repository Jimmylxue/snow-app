import {
  Button,
  CheckIcon,
  FormControl,
  Input,
  Select,
  TextArea,
  Toast,
  View,
} from 'native-base';
import React, { SafeAreaView } from 'react-native';
import { useState } from 'react';
import { adaptive } from '../../utils';
import { EExamType, useExamType, useAddExam } from '../../service/exam';

export function UploadExam() {
  const [typeId, setTypeId] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const [examType, setExamType] = useState<string>('');
  const [option, setOption] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const { data } = useExamType(['examType'], {}, {});
  // console.log('data', data);

  const { mutateAsync } = useAddExam({
    onSuccess: () => {
      Toast.show({ title: '添加成功' });
      setTypeId('');
      setName('');
      setDesc('');
      setExamType('');
      setOption('');
      setAnswer('');
    },
    onError: error => {
      Toast.show({ title: '添加失败' });
      console.log('error', error);
    },
  });

  return (
    <SafeAreaView>
      <View
        px={2}
        style={{
          paddingTop: adaptive(280),
        }}>
        <FormControl>
          <FormControl.Label>{'题目名称'}</FormControl.Label>
          <Input
            placeholder={'请输入题目名称'}
            w="100%"
            value={name}
            onChangeText={val => setName(val)}
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>{'题目描述'}</FormControl.Label>
          <Input
            placeholder={'请输入题目描述'}
            w="100%"
            value={desc}
            onChangeText={val => setDesc(val)}
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>{'题目类型'}</FormControl.Label>
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
            onValueChange={itemValue => {
              console.log('itemValue', itemValue);
              setTypeId(itemValue);
            }}>
            {data?.map(type => (
              <Select.Item
                key={type.id}
                label={type.name}
                value={String(type.id)}
              />
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <FormControl.Label>{'考题方式'}</FormControl.Label>
          <Select
            selectedValue={examType}
            minWidth="200"
            accessibilityLabel="选择课程类型"
            placeholder="Choose Service"
            _selectedItem={{
              bg: 'teal.600',
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
            onValueChange={itemValue => setExamType(itemValue)}>
            <Select.Item label={'选择题'} value={'1'} />
            <Select.Item label={'判断题'} value={'2'} />
          </Select>
        </FormControl>

        {+examType === EExamType.选择题 && (
          <FormControl>
            <FormControl.Label>{'题目选项'}</FormControl.Label>
            {/* @ts-ignore */}
            <TextArea
              aria-label="t1"
              numberOfLines={4}
              placeholder={'请输入题目选项，以@隔开'}
              // isInvalid
              _dark={{
                placeholderTextColor: 'gray.300',
              }}
              mb="5"
              value={option}
              onChangeText={val => setOption(val)}
            />
          </FormControl>
        )}

        <FormControl>
          <FormControl.Label>{'标准答案'}</FormControl.Label>
          <Input
            placeholder={'请输入数字，代表正确答案是第几项，判断题只能输入1或2'}
            w="100%"
            value={answer}
            onChangeText={val => setAnswer(val)}
          />
        </FormControl>

        <Button
          onPress={async () => {
            const isXuanZe = Number(examType) === EExamType.选择题;
            if (!isXuanZe) {
              // 判断题
              if (!['1', '2'].includes(answer)) {
                Toast.show({ title: '判断题超过范围' });
                return;
              }
            }
            console.log('examType', examType);
            console.log('option', option, typeId);
            const params = {
              name,
              desc,
              typeId: Number(typeId),
              examType: Number(examType),
              option: isXuanZe ? option : '对@错',
              answer: answer,
            };
            await mutateAsync(params);
          }}
          mt={2}>
          上传题目
        </Button>
      </View>
    </SafeAreaView>
  );
}
