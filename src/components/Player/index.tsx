// Load the module

import { useRef } from 'react';
import { StyleSheet } from 'react-native';
import Video from 'react-native-video';

type TProps = {
  videoLink: string;
};

export const Player = ({ videoLink }: TProps) => {
  const videoRef = useRef<any>(null);
  // const background = require('./background.mp4');

  return (
    <>
      <Video
        controls={true}
        // Can be a URL or a local file.
        source={{
          uri: videoLink,
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
