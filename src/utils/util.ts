import { Toast } from 'native-base';
import { Alert, Platform } from 'react-native';

type TAlertType = {
  message: string;
  title?: string;
};

export function showAlert({ message, title }: TAlertType) {
  Alert.alert(title || '', message);
}

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

/**
 * 计算体积分数
 */
export function getGasNumber(testGas: number, allGas: number) {
  return testGas / allGas;
}

/**
 * 判断甲烷是否超标
 *  甲烷浓度高于 5% 就为超标
 */
export function testJiaOver(jia: number) {
  return jia >= 0.05;
}

/**
 * 判断甲烷是否超标
 *  甲烷浓度高于 5% 就为超标
 */
export function testYiOver(yi: number) {
  return yi >= 0.027 && yi <= 0.125;
}

/**
 * 判断甲烷是否超标
 *  甲烷浓度高于 5% 就为超标
 */
export function testBingOver(yi: number) {
  return yi >= 0.021 && yi <= 0.096;
}

export function checkOver(jia: number, yi: number, bing: number, all: number) {
  const jiaGasNumber = getGasNumber(jia, all);
  const yiGasNumber = getGasNumber(yi, all);
  const bingGasNumber = getGasNumber(bing, all);
  let overText: string[] = [];
  if (testJiaOver(jiaGasNumber)) {
    overText.push('甲烷');
  }
  if (testYiOver(yiGasNumber)) {
    overText.push('乙烷');
  }
  if (testBingOver(bingGasNumber)) {
    overText.push('丙烷');
  }
  if (overText.length) {
    console.log(overText);
    Toast.show({
      title: overText.join(',') + '浓度超标，注意防火',
    });
  } else {
    Toast.show({
      title: '各气体浓度正常',
    });
  }
}
