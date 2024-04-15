import { memo, useEffect, useState } from 'react';
import { View, Text, Button, SafeAreaView } from 'react-native';
import { useAppState, useUserState } from '../../hooks/useAppState';
import { navigates } from '../../navigation/navigate';
import { getStorage, saveStorage } from '../../utils';
import { useLocation } from '../../hooks/useLocation';

export default memo(() => {
  const { state, signOut } = useAppState();
  const userInfo = useUserState();
  const [count, setCount] = useState<number>(0);
  const { info, getLocation } = useLocation();

  useEffect(() => {
    (async () => {
      const storageCount = await getStorage('snow-test-count');
      setCount(+storageCount || 0);
    })();
  }, []);

  return (
    <SafeAreaView>
      <View>
        <Text>nowCount: {count}</Text>
        <Text>APP-state: {JSON.stringify(state)}</Text>
        <Text>User-state: {JSON.stringify(userInfo)}</Text>
        <Text>当前定位信息: {JSON.stringify(info)}</Text>
        <Button
          onPress={() => {
            getLocation?.();
          }}
          title="获取当前定位"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <Button
          onPress={async () => {
            signOut?.();
          }}
          title="LoginOut"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <Button
          onPress={async () => {
            await saveStorage('snow-test-count', String(count + 1));
            setCount(count + 1);
          }}
          title="add one"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <Button
          onPress={() => {
            navigates('Mine', {
              userId: 111,
            });
          }}
          title="navigate to Mine"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <Button
          onPress={() => {
            navigates('IDPhoto', undefined);
          }}
          title="navigate IDPhoto"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <Button
          onPress={() => {
            navigates('KnowledgePlanet', undefined);
          }}
          title="navigate KnowledgePlanet"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <Button
          onPress={() => {
            navigates('LuckDraw', undefined);
          }}
          title="navigate LuckDraw"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <Button
          onPress={() => {
            navigates('Watermelon', undefined);
          }}
          title="navigate Watermelon"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <Button
          onPress={() => {
            navigates('StaticWebview', undefined);
          }}
          title="navigate StaticWebview"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <Button
          onPress={() => {
            navigates('NativeModule', undefined);
          }}
          title="navigate NativeModule"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    </SafeAreaView>
  );
});
