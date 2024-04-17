import { SafeAreaView, ScrollView } from 'react-native';
import { Button, Divider, View } from 'native-base';
import ManagerClubCard from '../components/ManagerClubCard';
import { useRef, useState } from 'react';
import { CreateNotifyClub, THandleType } from '../components/CreateNotifyClub';
import { useAllClub } from '../../../service/club';

export function ManagerAllClub() {
  const [showModal, setShowModal] = useState(false);
  const modalType = useRef<THandleType>('createClub');
  const clubId = useRef<number>();
  const { data } = useAllClub(['allClub'], {});

  return (
    <SafeAreaView>
      <View
        flexDirection="column"
        w="full"
        h="full"
        position="relative"
        pb="12"
        style={{
          paddingTop: 40,
        }}>
        <ScrollView>
          {data?.map(club => (
            <ManagerClubCard
              key={club.clubId}
              name={club.name}
              desc={club.desc}
              onHandlePush={type => {
                modalType.current = type;
                clubId.current = club.clubId;
                setShowModal(true);
              }}
            />
          ))}
        </ScrollView>
        <View position="absolute" bottom="0" h="12" w="full" px="3">
          <Divider />
          <Button
            onPress={() => {
              modalType.current = 'createClub';
              setShowModal(true);
            }}>
            创建社团
          </Button>
        </View>
      </View>
      <CreateNotifyClub
        clubId={clubId.current!}
        showModal={showModal}
        modalType={modalType.current}
        onClose={() => {
          setShowModal(false);
        }}
      />
    </SafeAreaView>
  );
}
