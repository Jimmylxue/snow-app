import { UseMutationOptions, useMutation } from 'react-query';
import { ClientError } from '../config/react-query';
import { get, post, put } from './client';
import { ERole } from '../pages/Choose';

enum ESex {
  男,
  女,
}

export type TUserLoginParams = {
  phone?: string;
  password: string;
};

export type TUserRegisterParams = TUserLoginParams & {
  username: string;
};

export type TChangeUserPassword = {
  username: string;
  originPassword: string;
  newPassword: string;
};

// export enum ERoleType {
//   托运人,
//   承运人,
// }

export type TUser = {
  avatar: string;
  createTime: string;
  id: number;
  mail?: string;
  phone?: string;
  sex: ESex;
  username: string;
  role: ERole;
};

export function useLogin(
  options?: UseMutationOptions<string, ClientError, TUserLoginParams>,
) {
  return useMutation<string, ClientError, TUserLoginParams>(
    data => get('/login', data),
    options,
  );
}

export function useUser(
  options?: UseMutationOptions<TUser, ClientError, { username: string }>,
) {
  return useMutation<TUser, ClientError, { username: string }>(
    data => get(`/loginuser/${data.username}`, data),
    options,
  );
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
  >(data => post('/enroll', data), options);
}

export function useUserChangePassword(
  options?: UseMutationOptions<
    {
      code: number;
      result: string;
    },
    ClientError,
    {
      password: string;
    }
  >,
) {
  return useMutation<
    {
      code: number;
      result: string;
    },
    ClientError,
    {
      password: string;
    }
  >(data => put('/editPassword', data), options);
}

type TChooseRole = {
  userId: number;
  role: ERole;
};

/**
 * 选择角色
 */
export function useChooseRole(
  options?: UseMutationOptions<
    {
      code: number;
      result: string;
    },
    ClientError,
    TChooseRole
  >,
) {
  return useMutation<
    {
      code: number;
      result: string;
    },
    ClientError,
    TChooseRole
  >(data => get('/setRole', data), options);
}
