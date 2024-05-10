// Load the module

import { useRef } from 'react';
import { StyleSheet } from 'react-native';
import Video from 'react-native-video';

// Within your render function, assuming you have a file called
// "background.mp4" in your project. You can include multiple videos
// on a single screen if you like.

export const Player = () => {
  const videoRef = useRef<any>(null);
  // const background = require('./background.mp4');

  return (
    <>
      <Video
        controls={true}
        // Can be a URL or a local file.
        source={{
          uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        }}
        // Store reference
        ref={videoRef}
        // Callback when remote video is buffering
        onBuffer={() => {}}
        // Callback when video cannot be loaded
        onError={() => {}}
        style={styles.backgroundVideo}
      />
    </>
  );
};

// Later on in your styles..
var styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
