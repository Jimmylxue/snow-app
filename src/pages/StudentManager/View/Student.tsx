import { Avatar, Button, Text, Toast, View } from 'native-base';
import { useLocation } from '../../../hooks/useLocation';
import { callPhone } from '../../../utils/util';
import { useEffect } from 'react';
import {
  useParentList,
  useReportPosition,
} from '../../../service/studentManager';

export function Student() {
  const { info, getLocation } = useLocation();

  const { data } = useParentList(['parentList'], {}, {});

  const { mutateAsync } = useReportPosition();

  useEffect(() => {
    const timer = setInterval(() => {
      getLocation?.();
    }, 1000 * 60);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    getLocation?.();
  }, []);

  useEffect(() => {
    (async () => {
      if (info?.latitude && info.longitude) {
        await mutateAsync({
          latitude: String(info.latitude),
          longitude: String(info.longitude),
        });
      }
    })();
  }, [info]);

  return (
    <>
      <View>
        <Text>当前定位信息: {JSON.stringify(info)}</Text>
      </View>
      <View mt={2}>
        <View flexDir="row" justifyContent="space-between" alignItems="center">
          <Text fontSize="md" fontWeight="semibold" mb={2}>
            家长账号
          </Text>
        </View>

        <View>
          {data?.id ? (
            <View
              flexDir="row"
              mb={3}
              justifyContent="space-between"
              alignItems="center">
              <View flexDir="row" alignItems="center">
                <Avatar
                  size="md"
                  source={{
                    uri: data?.avatar,
                  }}></Avatar>
                <View>
                  <Text fontSize="md" ml="2">
                    {data?.username}
                  </Text>
                  {/* {isManager && (
                    <Text ml="2" fontSize="xs" color="#f1c40f">
                      管理员
                    </Text>
                  )} */}
                </View>
              </View>
              <Button
                onPress={() => {
                  callPhone(data.phone || '');
                }}>
                紧急呼叫
              </Button>
            </View>
          ) : (
            <View>
              <Text>该账号还未被家长绑定，请联系家长绑定</Text>
            </View>
          )}
        </View>
      </View>
    </>
  );
}
