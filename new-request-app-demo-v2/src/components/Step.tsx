import { Box, Progress, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

type Props = {
  step: number;
};
function Step({ step }: Props) {
  const stepText: string[] = [
    "主研究者か共同研究者のいずれかを選択した後入力項目に入力してください",
    "チェックリスト",
    "入力内容の確認",
  ];

  useEffect(() => {});

  return (
    <Box w={"90%"} h={"100px"}>
      <Progress value={(step - 1) * 50} />
      <Text>STEP{step}</Text>
      <Text>{stepText[step - 1]}</Text>
    </Box>
  );
}

export default Step;
