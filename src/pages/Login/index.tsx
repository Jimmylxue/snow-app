import React, { useState } from 'react';
import { TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text } from 'native-base';
import { useAppState } from '../../hooks/useAppState';
import { useLogin } from '../../service';
import { encrypt } from '../../utils/encrypt';

export const Login = () => {
  const { signIn } = useAppState();
  const [isLogin, setIsLogin] = useState(true);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const { mutateAsync } = useLogin({
    onSuccess: async res => {
      console.log('res', res);
      await signIn?.(res.token, res.user);
    },
  });

  const handleAuthAction = async () => {
    const params = { phone, password };
    if (isLogin) {
      params.password = await encrypt(params.password);
      await mutateAsync(params);
    } else {
      // 注册逻辑
      console.log('执行注册操作');
    }
  };

  return (
    <View
      justifyContent="center"
      alignItems="center"
      backgroundColor="#3498db"
      h="full">
      <Text fontSize="2xl" fontWeight="bold" color="#FFF" mb="2">
        {isLogin ? '欢迎登录' : '欢迎注册'}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="请输入手机号"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="请输入密码"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.authButton} onPress={handleAuthAction}>
        <Text style={styles.buttonText}>{isLogin ? '登录' : '注册'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text style={styles.switchText}>
          {isLogin ? '没有账号？点击注册' : '已有账号？点击登录'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '80%',
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  authButton: {
    backgroundColor: '#2ecc71',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  switchText: {
    color: '#fff',
    fontSize: 14,
    marginTop: 10,
  },
});
