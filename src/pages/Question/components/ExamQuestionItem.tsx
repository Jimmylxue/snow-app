import { HamburgerIcon, Menu, Pressable, Radio, Text, View } from 'native-base';
import { EExamType, TExamItem } from '../../../service/exam';
import React, { useMemo } from 'react';
import { ChooseExamMap } from '../map';
import { adaptive } from '../../../utils';
import { ExamItem } from '../Exam';

type TProps = {
  question: ExamItem;
  showAnswer: boolean;
  showMenu: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onChoose?: (value: string) => void;
};

export function ExamQuestionItem({
  question,
  onEdit,
  onDelete,
  showAnswer,
  onChoose,
  showMenu,
}: TProps) {
  const OptionsList = useMemo(() => {
    const isChooseQuestion = question.examType === EExamType.选择题;
    const options = question.option?.split('@') || [];
    if (isChooseQuestion) {
      return options.map(
        // @ts-ignore
        (item, index) => `${ChooseExamMap[String(index)]}：${item}`,
      );
    } else {
      return options;
    }
  }, [question, ChooseExamMap, EExamType]);

  return (
    <View bgColor="#FFF" mb={2} px={3} py={2}>
      <View
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center">
        <Text
          fontWeight="semibold"
          fontSize="md"
          style={{
            width: adaptive(1600),
          }}>
          题目：{question.name}
        </Text>
        {showMenu && (
          <Menu
            w="190"
            trigger={triggerProps => {
              return (
                <Pressable
                  accessibilityLabel="More options menu"
                  {...triggerProps}>
                  <HamburgerIcon />
                </Pressable>
              );
            }}>
            <Menu.Item onPress={onEdit}>编辑</Menu.Item>
            <Menu.Item onPress={onDelete}>删除</Menu.Item>
          </Menu>
        )}
      </View>

      <Text>
        类型：{question.examType === EExamType.判断题 ? '判断题' : '选择题'}
      </Text>
      <View>
        <Radio.Group
          name="myRadioGroup"
          accessibilityLabel="favorite number"
          value={question.choose}
          onChange={nextValue => {
            onChoose?.(nextValue);
          }}>
          {OptionsList.map((item, index) => (
            <Radio
              key={index}
              // @ts-ignore
              value={ChooseExamMap[index]}
              my={1}
              isDisabled={showAnswer}>
              {item}
            </Radio>
          ))}
        </Radio.Group>
      </View>
      {showAnswer && (
        <View>
          <Text>
            正确答案：
            {question.examType === EExamType.判断题
              ? OptionsList[Number(question.answer) - 1]
              : // @ts-ignore
                ChooseExamMap[Number(question.answer) - 1]}
          </Text>
        </View>
      )}

      <View>
        <Text>本题考点：{question.desc}</Text>
      </View>
    </View>
  );
}
