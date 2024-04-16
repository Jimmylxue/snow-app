import {
  ChevronRightIcon,
  Icon,
  Image,
  Row,
  Spacer,
  Text,
  View,
} from 'native-base';
import { ReactNode } from 'react';
import { ImageSourcePropType, TouchableOpacity } from 'react-native';
import { adaptive } from '../../utils';

type TProps = {
  icon: ImageSourcePropType;
  title: string;
  value?: string;
  renderValue?: () => ReactNode;
  right?: boolean;
  onPress?: () => void;
  isLast?: boolean;
};

export function InfoLine({
  icon,
  title,
  value,
  right,
  onPress,
  renderValue,
  isLast = false,
}: TProps) {
  return (
    <TouchableOpacity disabled={!onPress} activeOpacity={1} onPress={onPress}>
      <View
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center">
        <Image
          source={icon}
          width={adaptive(35)}
          height={adaptive(35)}
          resizeMode="contain"
          alt="icon"
        />
        <Row
          flex={1}
          borderBottomWidth={isLast ? 0 : 1}
          borderBottomColor="#eee"
          py={4}
          alignItems="center">
          <Text ml={2} fontSize={14} fontWeight="medium" color="#333">
            {title}
          </Text>
          <Spacer />
          {renderValue ? (
            renderValue()
          ) : value ? (
            <Text fontSize={14} color="#999">
              {value}
            </Text>
          ) : null}
          {right ? <ChevronRightIcon /> : null}
        </Row>
      </View>
    </TouchableOpacity>
  );
}
