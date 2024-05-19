import { UseMutationOptions, useMutation } from 'react-query';
import { ClientError } from '../config/react-query';
import { post } from './client';

export enum ESex {
  未知,
  男,
  女,
}

export type TUserLoginParams = {
  phone: string;
  password: string;
};

export type TUserRegisterParams = TUserLoginParams & {
  username: string;
};

export type TChangeUserPassword = {
  phone: string;
  originPassword: string;
  newPassword: string;
};

export enum ERoleType {
  未定义,
  普通用户,
  管理员,
}

export type TUser = {
  avatar: string;
  createTime: string;
  id: number;
  mail?: string;
  phone?: string;
  sex: ESex;
  username: string;
  role: ERoleType;
};

export function useLogin(
  options?: UseMutationOptions<
    { token: string; user: TUser },
    ClientError,
    TUserLoginParams
  >,
) {
  return useMutation<
    { token: string; user: TUser },
    ClientError,
    TUserLoginParams
  >(data => post('/user/login', data), options);
}

export function useUpdateUser(
  options?: UseMutationOptions<
    TUser,
    ClientError,
    { username?: string; phone?: string; sex?: ESex; role?: ERoleType }
  >,
) {
  return useMutation<
    TUser,
    ClientError,
    { username?: string; phone?: string; sex?: ESex; role?: ERoleType }
  >(data => post('/user/update', data), options);
}

export function useUserRegister(
  options?: UseMutationOptions<
    {
      code: number;
      result: string;
    },
    ClientError,
    TUserRegisterParams
  >,
) {
  return useMutation<
    {
      code: number;
      result: string;
    },
    ClientError,
    TUserRegisterParams
  >(data => post('/user/register', data), options);
}

export function useUserChangePassword(
  options?: UseMutationOptions<
    {
      code: number;
      result: string;
    },
    ClientError,
    TChangeUserPassword
  >,
) {
  return useMutation<
    {
      code: number;
      result: string;
    },
    ClientError,
    TChangeUserPassword
  >(data => post('/user/changePassword', data), options);
}
