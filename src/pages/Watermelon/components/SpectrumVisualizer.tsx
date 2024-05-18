import React from 'react';
import { View } from 'react-native';

export const SpectrumVisualizer = ({ audioData }: { audioData: any[] }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        height: 100,
      }}>
      {audioData.map((dataPoint, index) => (
        <View
          key={index}
          style={{ flex: 1, backgroundColor: 'blue', height: dataPoint * 2 }}
        />
      ))}
    </View>
  );
};
