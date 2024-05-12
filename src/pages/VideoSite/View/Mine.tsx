import { ScrollView } from 'native-base';
import ClubCard from '../components/CourseTypeCard';
import { useUserClub } from '../../../service/club';

export function MineClub() {
  const { data } = useUserClub(['myClub'], {});

  return (
    <ScrollView>
      {data?.map(club => (
        <ClubCard
          key={club.clubId}
          name={club?.club?.name}
          desc={club?.club?.desc}
          joinTime={club.createdTime}
          clubId={club.clubId}
          isMine
        />
      ))}
    </ScrollView>
  );
}
