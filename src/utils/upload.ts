import axios from 'axios';
import { serverUrl } from '../service/client';
import { Toast } from 'native-base';
import DocumentPicker, {
  DocumentPickerResponse,
  types,
} from 'react-native-document-picker';

export async function handleUpload(
  file: DocumentPickerResponse,
): Promise<string> {
  const formData = new FormData();
  formData.append('file', {
    uri: file.uri,
    type: file.type,
    name: file.name,
  });

  try {
    const res = await axios.post(`${serverUrl}/static/uploadfile`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    Toast.show({ title: '上传成功' });
    return res.data.result;
  } catch (error) {
    Toast.show({ title: '上传失败' });
    return '';
  }
}

export async function chooseSystemFile(type: keyof typeof types) {
  try {
    // 打开文件选择界面
    const result = await DocumentPicker.pick({
      type: [DocumentPicker.types[type]],
    });
    // 获取选择的文件路径
    const file = result?.[0];
    return file;
  } catch (err) {
    console.error('打开文件选择界面失败:', err);
  }
}
