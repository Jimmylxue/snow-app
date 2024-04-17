import { ScrollView } from 'react-native';
import ClubCard from '../components/ClubCard';
import { useAllClub, useJoinClub } from '../../../service/club';
import { useConfirmDialog } from '../../../components/ConfirmDialog';
import { Toast } from 'native-base';
import { useReactQuery } from '../../../config/react-query';

export function AllClub() {
  const { data } = useAllClub(['allClub'], {});
  const { node, showDialog } = useConfirmDialog();
  const { queryClient } = useReactQuery();
  const { mutateAsync } = useJoinClub({
    onSuccess() {
      Toast.show({ title: '加入成功' });
      queryClient.invalidateQueries('myClub');
    },
  });

  return (
    <ScrollView>
      {data?.map(club => (
        <ClubCard
          key={club.clubId}
          name={club.name}
          desc={club.desc}
          clubId={club.clubId}
          onJoinClub={() => {
            showDialog({
              title: '加入社团',
              content: `确定加入该${club.name}吗？`,
              onConfirm: async () => {
                await mutateAsync({
                  clubId: club.clubId,
                });
              },
            });
          }}
        />
      ))}
      {node}
    </ScrollView>
  );
}
