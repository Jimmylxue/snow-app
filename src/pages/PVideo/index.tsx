import { View } from 'native-base';
import { Player } from '../../components/Player';
import { adaptive } from '../../utils';

const VideoPlayer = () => {
  // const background = require('./background.mp4');

  return (
    <View>
      <View
        style={{
          height: adaptive(1080),
        }}>
        <Player />
      </View>
    </View>
  );
};

export default VideoPlayer;
