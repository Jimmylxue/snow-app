import { Button } from 'native-base';
import { SafeAreaView } from 'react-native';
import { chooseSystemFile, handleUpload } from '../../../utils/upload';

export function UploadVideo() {
  const chooseFile = async () => {
    try {
      const file = await chooseSystemFile('video');
      if (file) {
        handleUpload(file);
      }
    } catch (err) {
      console.error('打开文件选择界面失败:', err);
    }
  };

  return (
    <SafeAreaView>
      <Button onPress={chooseFile}>上传</Button>
    </SafeAreaView>
  );
}
