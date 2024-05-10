import { memo, useState } from 'react';
import {
  Box,
  Stack,
  FormControl,
  Input,
  Divider,
  Button,
  View,
  Text,
  Modal,
} from 'native-base';
import { SafeAreaView } from 'react-native';

export default memo(() => {
  return (
    <SafeAreaView>
      <Box px={2} py={2}>
        <FormControl mb="5">
          <FormControl.Label>货物种类</FormControl.Label>
          <Input />
        </FormControl>
        <FormControl mb="5">
          <FormControl.Label>货物重量/体积</FormControl.Label>
          <Input />
        </FormControl>
        <FormControl mb="5">
          <FormControl.Label>装卸要求</FormControl.Label>
          <Input />
        </FormControl>
        <FormControl mb="5">
          <FormControl.Label>装卸等待时间</FormControl.Label>
          <Input />
        </FormControl>
        <FormControl mb="5">
          <FormControl.Label>起运地</FormControl.Label>
          <Input />
        </FormControl>
        <FormControl mb="5">
          <FormControl.Label>目的地</FormControl.Label>
          <Input />
        </FormControl>
        <FormControl mb="5">
          <FormControl.Label>时效要求</FormControl.Label>
          <Input />
        </FormControl>
      </Box>
      <Button>发布托运请求</Button>
    </SafeAreaView>
  );
});
