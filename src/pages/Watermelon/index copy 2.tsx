import { memo, useRef, useState } from 'react';
import { View, Text } from 'native-base';
import { SafeAreaView, ScrollView, Button } from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFetchBlob from 'rn-fetch-blob';
import { Buffer } from 'buffer';
import { FFT } from 'fft-js';
var fft = require('fft-js').fft;

const audioRecorderPlayer = new AudioRecorderPlayer();

const url = 'file:////data/user/0/com.awesometsproject/cache/sound.mp4';

export default memo(() => {
  const path = useRef<string>();
  const [audioData, setAudioData] = useState<any[]>([]);
  const [recordInfo, setRecordInfo] = useState({});

  const intervalId = useRef<any>();

  // 解码 base64 音频数据为字节数组
  const base64ToByteArray = base64 => {
    const binaryStr = Buffer.from(base64, 'base64').toString('binary');
    const bytes = new Uint8Array(binaryStr.length);
    for (let i = 0; i < binaryStr.length; i++) {
      bytes[i] = binaryStr.charCodeAt(i);
    }
    // console.log('bytes', bytes);
    var phasors = fft(bytes);
    console.log(phasors);
    return bytes;
  };

  // 处理音频数据的函数
  const processAudioData = data => {
    // 在这里可以添加音频数据处理逻辑，比如频谱分析等操作
    // 解码 base64 音频数据为原始数据
    const audioData = Buffer.from(data, 'base64').toString('binary');
    const fft = new FFT(audioData.length);
    console.log('audioData', audioData.length);
    return data; // 这里示例直接返回原始数据
  };

  const onStartRecord = async () => {
    const result = await audioRecorderPlayer.startRecorder();

    intervalId.current = setInterval(async () => {
      const audioFileUri = result;
      const response = await RNFetchBlob.fs.readStream(audioFileUri, 'base64');

      response.open();
      const chunkSize = 4096;
      let data = '';

      response.onData(chunk => {
        data += chunk;
        if (data.length >= chunkSize) {
          // 处理音频数据，这里可以进行频谱分析等操作
          // console.log('Audio Data:', data);

          const processedData = base64ToByteArray(data);

          setAudioData(prevData => [...prevData, processedData]);
          // 清空数据
          data = '';
        }
      });

      response.onError(err => {
        console.log('Error reading audio data:', err);
      });
    }, 1000);

    // audioRecorderPlayer.addRecordBackListener(async e => {
    //   // 在这里处理音频数据，可以进行频谱分析等操作
    //   console.log('Audio Data:', audioData);

    //   setRecordInfo({
    //     recordSecs: e.currentPosition,
    //     recordTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
    //   });
    //   return;
    // });
    // path.current = result;
    console.log('sss', result);
  };

  const onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    clearInterval(intervalId.current);
    audioRecorderPlayer.removeRecordBackListener();
    setRecordInfo({
      recordSecs: 0,
    });
    console.log('结束啦~', result);
  };

  const onStartPlay = async () => {
    const msg = await audioRecorderPlayer.startPlayer();
    audioRecorderPlayer.addPlayBackListener(e => {
      setRecordInfo({
        currentPositionSec: e.currentPosition,
        currentDurationSec: e.duration,
        playTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
        duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
      });
      return;
    });
  };

  const onPausePlay = async () => {
    await audioRecorderPlayer.pausePlayer();
  };

  const onStopPlay = async () => {
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
  };

  const onPlay2 = () => {
    // const player = new Player(url);
    // player.play();
    // player.addPlayBackListener(e => {
    //   // 获取音频数据
    //   const audioData = e.audioData;
    //   console.log('音频数据', audioData);
    //   // 计算频率信息（这里是一个简单的示例，实际应用中需要使用 FFT 等算法）
    //   // const frequencyInfo = calculateFrequencyInfo(audioData);
    //   // 打印频率信息
    //   // console.log(frequencyInfo);
    // });
  };

  return (
    <ScrollView>
      <SafeAreaView>
        <View>
          {/* <Text>Audio Path: {audioPath}</Text> */}
          {/* <Text>Audio Duration: {audioDuration}</Text> */}
          <Button title="开始记录" onPress={onStartRecord} />
          <Button title="结束记录" onPress={onStopRecord} />
          <Button title="开始播放" onPress={onStartPlay} />
          <Button title="暂停播放" onPress={onPausePlay} />
          <Button title="结束播放" onPress={onStopPlay} />
          <Button title="播放2" onPress={onPlay2} />
        </View>

        <View>{/* <SpectrumVisualizer /> */}</View>
      </SafeAreaView>
    </ScrollView>
  );
});
