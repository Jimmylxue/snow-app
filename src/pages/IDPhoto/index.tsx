import { memo, useRef, useState } from 'react';
import { View, Text, Button } from 'native-base';
import { SafeAreaView } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';

const TCameraType = RNCamera.Constants.Type;

export default memo(() => {
  const camera = useRef<RNCamera | null>(null);
  const [cameraType, setCameraType] = useState<typeof TCameraType>(
    TCameraType.front,
  );

  const takePicture = async () => {
    if (camera.current) {
      const options = { quality: 0.5, base64: true };
      const data = await camera.current.takePictureAsync(options);
      console.log(data.uri);
      let promise = CameraRoll.saveToCameraRoll(data.uri, 'photo');
      promise
        .then(result => {
          console.log('保存成功', result);
        })
        .catch(err => {
          console.log('err', err);
        });
    }
  };

  const changeCamera = () => {
    cameraType === TCameraType.back
      ? setCameraType(TCameraType.front)
      : setCameraType(TCameraType.back);
  };

  return (
    <View>
      <SafeAreaView>
        <RNCamera
          captureAudio={false}
          ref={ref => {
            camera.current = ref;
          }}
          // @ts-ignore
          type={cameraType}
          style={{
            width: 400,
            height: 600,
          }}
          notAuthorizedView={<Text>Please open permission of camera</Text>}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          barCodeTypes={[
            RNCamera.Constants.BarCodeType.qr,
            RNCamera.Constants.BarCodeType.ean13,
            RNCamera.Constants.BarCodeType.code128,
            RNCamera.Constants.BarCodeType.code39,
          ]}
          onBarCodeRead={result => {
            console.log('result~', result);
          }}></RNCamera>
        <View
          style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <Button mr={1} onPress={takePicture}>
            {' '}
            SNAP{' '}
          </Button>
          <Button ml={1} onPress={changeCamera}>
            {' '}
            change{' '}
          </Button>
        </View>
      </SafeAreaView>
    </View>
  );
});
