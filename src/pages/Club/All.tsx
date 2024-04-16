import { ScrollView } from 'react-native';
import ClubCard from './components/ClubCard';

export function AllClub() {
  return (
    <ScrollView>
      <ClubCard name="篮球社" desc="篮球" />
      <ClubCard name="街舞社" desc="这就是街舞！" />
      <ClubCard name="街舞社" desc="这就是街舞！" />
      <ClubCard name="街舞社" desc="这就是街舞！" />
      <ClubCard name="街舞社" desc="这就是街舞！" />
      <ClubCard name="街舞社" desc="这就是街舞！" />
      <ClubCard name="街舞社" desc="这就是街舞！" />
      <ClubCard name="街舞社" desc="这就是街舞！" />
      <ClubCard name="街舞社" desc="这就是街舞！" />
    </ScrollView>
  );
}
