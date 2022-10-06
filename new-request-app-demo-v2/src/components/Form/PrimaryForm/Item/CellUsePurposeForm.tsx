import {
  Box,
  ComponentMultiStyleConfig,
  Fade,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
  useMultiStyleConfig,
  VStack,
} from "@chakra-ui/react";

import { ReactElement, ReactNode, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type Inputs = {
  provider1: string;
  provider2: string;
  providedCell1: string;
  providedCell2: string;
  text: string;
};

export function CellUsePurposeForm() {
  const [administerToHuman, setAdministerToHuman] = useState("0");
  const [purposeOfAdminister, setPurposeOfAdminister] = useState("cellBank");

  const formStyles = useMultiStyleConfig("Form", {});
  const cellUsePurposeFormStyles = useMultiStyleConfig(
    "CellUsePurposeForm",
    {}
  );
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const hideInputElement = (
    <Box>
      <RadioGroup value={purposeOfAdminister} onChange={setPurposeOfAdminister}>
        <Box marginBottom={"20px"}>
          <Radio value="cellBank">セルバンクの作成</Radio>
        </Box>
        <Box>
          <Radio value="clinical">臨床研究・治験</Radio>
        </Box>
      </RadioGroup>
    </Box>
  );

  return (
    <Box __css={cellUsePurposeFormStyles.inputBox}>
      <Box __css={formStyles.formItemHead}>iPS細胞の使用目的</Box>
      <RadioGroup
        value={administerToHuman}
        onChange={setAdministerToHuman}
        margin="30px"
      >
        <Box marginBottom="20px">
          <Radio value="0">ヒトへの投与なし(基礎研究等)</Radio>
          <Fade in={administerToHuman === "0"}></Fade>
        </Box>

        <Box>
          <Radio value="1">ヒトへの投与あり(下記のいずれかを選択)</Radio>
          <Fade in={administerToHuman === "1"}>
            <Box __css={cellUsePurposeFormStyles.hideInput}>
              {hideInputElement}
            </Box>
          </Fade>
        </Box>
      </RadioGroup>
    </Box>
  );
}

export const CellUsePurposeFormStyles: ComponentMultiStyleConfig = {
  parts: ["inputBox", "hideInput"],
  baseStyle: {
    inputBox: {
      w: "1000px",
      border: "1px",
      borderColor: "gray.400",
      padding: "30px",
    },
    hideInput: {
      h: "100px",
      paddingLeft: "10px",
      marginTop: "20px",
      marginLeft: "20px",
    },
  },
};
