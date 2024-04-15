import BcryptReactNative from 'bcrypt-react-native';

const SALT_ROUNDS = 10;

export async function encrypt(rawStr: string) {
  const salt = await BcryptReactNative.getSalt(SALT_ROUNDS);
  return await BcryptReactNative.hash(salt, rawStr);
}
