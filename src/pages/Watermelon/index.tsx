import { memo, useState } from 'react';
import { View, Text } from 'native-base';
import { SafeAreaView, ScrollView, Button } from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

const audioRecorderPlayer = new AudioRecorderPlayer();

export default memo(() => {
  const [recordInfo, setRecordInfo] = useState({});

  const onStartRecord = async () => {
    const result = await audioRecorderPlayer.startRecorder();
    audioRecorderPlayer.addRecordBackListener(e => {
      setRecordInfo({
        recordSecs: e.currentPosition,
        recordTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
      });
      return;
    });
    console.log('sss', result);
  };

  const onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    console.log('结束啦~', result);
    audioRecorderPlayer.removeRecordBackListener();
    setRecordInfo({
      recordSecs: 0,
    });
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
        </View>
      </SafeAreaView>
    </ScrollView>
  );
});
