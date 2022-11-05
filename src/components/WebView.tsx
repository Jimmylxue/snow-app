import React, { Ref, useEffect, useImperativeHandle, useRef } from 'react';
import {
  WebView as SnowWebView,
  WebViewNavigation,
} from 'react-native-webview';
import { useIsFocused } from '@react-navigation/native';
import RNFetchBlob from 'rn-fetch-blob';
import RNFS, { downloadFile } from 'react-native-fs';

function WebView(
  props: {
    url: string;
    refresh?: boolean;
    onMessage?(data: string): void;
    ignore?: boolean;
    injectedJavaScript?: string;
  },
  ref: Ref<{ postMessage?(message: any): void }>,
) {
  const { url, refresh, onMessage, ignore = false, injectedJavaScript } = props;

  const webViewRefs = useRef<SnowWebView | null>(null);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused || refresh) {
      webViewRefs.current?.reload();
    }
  }, [isFocused, refresh]);

  useImperativeHandle(ref, () => {
    return { postMessage: webViewRefs.current?.postMessage };
  });

  const handleNavigationStateChange = ({ url }: WebViewNavigation) => {
    if (!url) return;

    if (url.startsWith('blob')) {
      // webViewRef.current?.stopLoading();
      download(url);
    }
  };

  const download = (url: string) => {
    console.log('url~~', url);
    downloadFile({
      fromUrl: 'https://facebook.github.io/react-native/img/header_logo.png',
      toFile: `${RNFS.DocumentDirectoryPath}/react-native.png`,
    }).promise.then(r => {
      console.log('rrr', r);
      // this.setState({ isDone: true });
    });

    // downloadFile
  };

  const uri = url;

  console.log(uri);

  return (
    <SnowWebView
      ref={webViewRefs}
      cacheEnabled={false}
      cacheMode="LOAD_NO_CACHE"
      contentMode="desktop"
      mixedContentMode="compatibility"
      androidLayerType="hardware"
      javaScriptEnabled={true}
      domStorageEnabled={true}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      injectedJavaScript={injectedJavaScript}
      originWhitelist={['*']}
      onNavigationStateChange={handleNavigationStateChange}
      textZoom={100}
      onMessage={(e: any) => {
        onMessage?.(e.nativeEvent.data);
      }}
      source={{
        uri: uri,
      }}
    />
  );
}

export default React.forwardRef(WebView);
