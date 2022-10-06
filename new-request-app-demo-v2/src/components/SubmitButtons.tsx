import {
  Box,
  Button,
  ComponentMultiStyleConfig,
  HStack,
  Text,
  useMultiStyleConfig,
  VStack,
} from "@chakra-ui/react";

type Props = {
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  restOfInput: number;
};

export const SubmitButtons = ({ onClick, restOfInput }: Props) => {
  const styles = useMultiStyleConfig("SubmitButtons", {});
  return (
    <VStack __css={styles.submitContent}>
      <Box __css={styles.restOfInput}>
        <VStack>
          <Box __css={styles.restOfInput_text1}>入力項目は残り</Box>
          <HStack>
            <Box __css={styles.restOfInput_text2}>{restOfInput}</Box>
            <Box __css={styles.restOfInput_text3}>件です</Box>
          </HStack>
        </VStack>
      </Box>
      <Button colorScheme={"purple"}>下書きを保存する</Button>
      <Button
        colorScheme={"teal"}
        onClick={onClick}
        disabled={restOfInput !== 0}
      >
        次へ
      </Button>
    </VStack>
  );
};

export const SubmitButtonStyles: ComponentMultiStyleConfig = {
  parts: [
    "submitContent",
    "restOfInput",
    "restOfInput_text1",
    "restOfInput_text2",
    "restOfInput_text3",
    "saveButton",
    "progressButton",
  ],
  baseStyle: {
    submitContent: {
      position: "fixed",
      top: "700px",
      right: "100px",
      zIndex: "sticky",
    },
    restOfInput: {
      w: "300px",
      h: "100px",
      border: "1px",
      borderRadius: "md",
      marginBottom: "5px",
      bgColor: "white",
    },
    restOfInput_text1: {
      fontWeight: "bold",
      marginRight: "100px",
      marginTop: "10px",
    },
    restOfInput_text2: {
      color: "red",
      fontSize: "3xl",
      fontWeight: "bold",
      marginTop: "10px",
      marginRight: "20px",
      marginLeft: "30px",
    },
    restOfInput_text3: {
      fontWeight: "bold",
      paddingTop: "10px",
    },
  },
};
