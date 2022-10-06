import {
  Box,
  Collapse,
  ComponentMultiStyleConfig,
  Fade,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Radio,
  RadioGroup,
  SlideFade,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
  useDisclosure,
  useMultiStyleConfig,
  VStack,
} from "@chakra-ui/react";

import { ReactElement, ReactNode, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Props = {
  setIsCompleteForm: React.Dispatch<React.SetStateAction<boolean[]>>;
};
type Inputs = {
  strainType: string;
  cellNo: string;
  cellName: string;
};

export function CellNoForm({ setIsCompleteForm }: Props) {
  const [value, setValue] = useState("1");

  // //研究用株か臨床株
  // const [strainType, setStrainType] = useState("laboratory");

  // //株番号
  // const [cellNo, setCellNo] = useState("");

  // //株名
  // const [cellName, setCellName] = useState("");

  const formStyles = useMultiStyleConfig("Form", {});
  const cellNoFormStyles = useMultiStyleConfig("CellNoForm", {});
  const {
    register,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  let watchCellNo = watch("cellNo", "");
  let watchCellName = watch("cellName", "");

  //wacth関数を用いて入力値が変更されるたびにstateに登録
  //(onChangeはReact-Hook-Formを使用すると使えない)
  useEffect(() => {
    if (
      watchCellNo !== "" &&
      watchCellName !== "" &&
      !errors.cellNo &&
      !errors.cellName
    ) {
      setIsCompleteForm((isCompleteForm) => {
        //「使用を希望するIPS細胞の番号」はisCompleteFormのindex=1に相当
        return isCompleteForm.map((elem, index) => (index === 1 ? true : elem));
      });
    } else {
      setIsCompleteForm((isCompleteForm) => {
        return isCompleteForm.map((elem, index) =>
          index === 1 ? false : elem
        );
      });
    }
  }, [
    watchCellNo,
    watchCellName,
    errors.cellNo,
    errors.cellName,
    setIsCompleteForm,
  ]);

  const hideInputElement = (
    <HStack spacing={"20px"}>
      <Box>
        <FormLabel>番号</FormLabel>

        <Input
          {...register("cellNo", {
            required: {
              value: true,
              message: "株番号を入力してください",
            },
          })}
        ></Input>
        <Box __css={formStyles.errorText}>{errors.cellNo?.message}</Box>
      </Box>
      <Box>
        <FormLabel>株名</FormLabel>
        <Input
          {...register("cellName", {
            required: {
              value: true,
              message: "株名を入力してください",
            },
          })}
        ></Input>
        <Box __css={formStyles.errorText}>{errors.cellName?.message}</Box>
      </Box>
    </HStack>
  );

  const handleRadioChange = (val: string) => {
    setValue(val);
    reset({ cellNo: "", cellName: "" });
  };

  return (
    <Box __css={cellNoFormStyles.inputBox}>
      <Box __css={formStyles.formItemHead}>使用を希望するIPS細胞の番号</Box>
      <RadioGroup value={value} onChange={handleRadioChange} margin="30px">
        <HStack>
          <Radio value="1">研究用株</Radio>

          <Fade in={value === "1"}>
            <Box __css={cellNoFormStyles.hideInput}>
              {value === "1" && hideInputElement}
              {/* {hideInputElement} */}
            </Box>
          </Fade>
        </HStack>

        <HStack>
          <Radio value="2">臨床株</Radio>

          <Fade in={value === "2"}>
            <Box __css={cellNoFormStyles.hideInput}>
              {value === "2" && hideInputElement}
              {/* {hideInputElement} */}
            </Box>
          </Fade>
        </HStack>
      </RadioGroup>
    </Box>
  );
}

export const CellNoFormStyles: ComponentMultiStyleConfig = {
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
    },
  },
};
