import { UseMutationOptions, useMutation } from 'react-query';
import { ClientError } from '../config/react-query';
import { post } from './client';

enum ESex {
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

export type TUser = {
  avatar: string;
  createTime: string;
  id: number;
  mail?: string;
  phone?: string;
  sex: ESex;
  username: string;
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
    Pick<TUser, 'id' | 'avatar' | 'username'>
  >,
) {
  return useMutation<
    TUser,
    ClientError,
    Pick<TUser, 'id' | 'avatar' | 'username'>
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
