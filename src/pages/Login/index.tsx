import React, { useState } from 'react';
import { TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text, Toast } from 'native-base';
import { useAppState } from '../../hooks/useAppState';
import {
  TChangeUserPassword,
  useLogin,
  useUserChangePassword,
  useUserRegister,
} from '../../service';
import { encrypt } from '../../utils/encrypt';
import { encode as btoa } from 'base-64';

type TFormStatus = 'LOGIN' | 'REGISTER' | 'FORGET';

export const Login = () => {
  const { signIn } = useAppState();
  const [formStatus, setFormStatus] = useState<TFormStatus>('LOGIN');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { mutateAsync } = useLogin({
    onSuccess: async res => {
      await signIn?.(res.token, res.user);
    },
  });

  const { mutateAsync: register } = useUserRegister({
    onSuccess: async () => {
      Toast.show({ title: '注册成功，快去登录吧' });
      setFormStatus('LOGIN');
    },
  });

  const { mutateAsync: changePassword } = useUserChangePassword({
    onSuccess: async () => {
      Toast.show({ title: '密码修改成功，快去登录吧' });
      setPassword('');
      setConfirmPassword('');
      setFormStatus('LOGIN');
    },
  });

  const handleAuthAction = async () => {
    if (
      !/^1(3[0-9]|4[01456879]|5[0-3,5-9]|6[2567]|7[0-8]|8[0-9]|9[0-3,5-9])\d{8}$/.test(
        phone,
      )
    ) {
      Toast.show({ title: '请输入正确的手机号' });
      return;
    }
    const params = { phone, password };
    if (formStatus === 'LOGIN') {
      // 登录
      console.log('ccc');
      params.password = await encrypt(params.password);
      await mutateAsync(params);
    } else if (formStatus === 'REGISTER') {
      // 注册
      if (!phone || !password) {
        Toast.show({ title: '请输入注册信息' });
        return;
      }
      if (password !== confirmPassword) {
        Toast.show({ title: '两次密码不一致，请确认' });
        return;
      }
      params.password = btoa(params.password + 'snow-todoList');
      await register({
        ...params,
        username: '游客' + Date.now().toString().slice(0, -4),
      });
    } else {
      // 找回
      if (!phone || !password) {
        Toast.show({ title: '请输入账号' });
        return;
      }
      if (password === confirmPassword) {
        Toast.show({ title: '两次密码一致，无需修改' });
        return;
      }
      const forgetParams: TChangeUserPassword = {
        phone,
        originPassword: await encrypt(password),
        newPassword: btoa(confirmPassword + 'snow-todoList'),
      };
      await changePassword(forgetParams);
    }
  };

  const isLogin = formStatus === 'LOGIN';
  const isRegister = formStatus === 'REGISTER';
  const isForget = formStatus === 'FORGET';

  return (
    <View
      justifyContent="center"
      alignItems="center"
      backgroundColor="#3498db"
      h="full">
      <Text fontSize="2xl" fontWeight="bold" color="#FFF" mb="2">
        {isLogin ? '欢迎登录' : isRegister ? '欢迎注册' : '找回密码'}
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
      {!isLogin && (
        <TextInput
          style={styles.input}
          placeholder="再次确定密码"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      )}
      <TouchableOpacity style={styles.authButton} onPress={handleAuthAction}>
        <Text style={styles.buttonText}>
          {isLogin ? '登录' : isRegister ? '注册' : '确定更改'}
        </Text>
      </TouchableOpacity>
      <View flexDir="row" justifyContent="flex-end" w="full" px="10">
        {/* <TouchableOpacity
          onPress={() => setFormStatus(isForget ? 'LOGIN' : 'FORGET')}>
          <Text style={styles.switchText}>
            {isForget ? '返回' : '忘记密码'}
          </Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() =>
            setFormStatus(state => (state === 'LOGIN' ? 'REGISTER' : 'LOGIN'))
          }>
          <Text style={styles.switchText}>
            {formStatus === 'LOGIN'
              ? '没有账号？点击注册'
              : '已有账号？点击登录'}
          </Text>
        </TouchableOpacity>
      </View>
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
