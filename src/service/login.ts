import { UseMutationOptions, useMutation } from 'react-query';
import { ClientError } from '../config/react-query';
import { post } from './client';

enum ESex {
  男,
  女,
}

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
    {
      phone: string;
      password: string;
    }
  >,
) {
  return useMutation<
    { token: string; user: TUser },
    ClientError,
    {
      phone: string;
      password: string;
    }
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
