import {
  Box,
  ComponentMultiStyleConfig,
  FormControl,
  FormLabel,
  HStack,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
  useMultiStyleConfig,
  VStack,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { setConstantValue } from "typescript";

type Inputs = {
  endYear: number;
  endMonth: number;
  endDate: number;
};

export function PeriodOfCellUseForm() {
  const periodOfCellUseFormStyles = useMultiStyleConfig(
    "PeriodOfCellUseForm",
    {}
  );
  const formStyles = useMultiStyleConfig("Form", {});
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const today = new Date();
  const thisYear = today.getFullYear();
  const defaultMonth = 1;
  const defaultDate = 1;

  const [endYear, setEndYear] = useState(thisYear + 1);
  const [endMonth, setEndMonth] = useState(defaultMonth);
  const [endDate, setEndDate] = useState(defaultDate);

  const handleEndYearChange = (value: string) => {
    setEndYear(Number(value));
    console.log(value);
  };
  const handleEndMonthChange = (value: string) => {
    setEndMonth(Number(value));
    console.log(value);
  };
  const handleEndDateChange = (value: string) => {
    setEndDate(Number(value));
    console.log(value);
  };

  return (
    <Box __css={periodOfCellUseFormStyles.inputBox}>
      <Box __css={formStyles.formItemHead}>使用期間</Box>
      <Box margin="30px">
        <HStack>
          <Box paddingRight={"50px"}>(西暦)</Box>
          <Box paddingRight={"30px"}>承認日</Box>
          <Box paddingRight={"30px"}>～</Box>
          <NumberInput
            onChange={handleEndYearChange}
            value={endYear}
            min={thisYear}
            paddingLeft="20px"
            w="120px"
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Box>年</Box>
          <NumberInput
            onChange={handleEndMonthChange}
            value={endMonth}
            min={1}
            max={12}
            paddingLeft="20px"
            w="120px"
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Box>月</Box>
          <NumberInput
            onChange={handleEndDateChange}
            value={endDate}
            defaultValue={defaultDate}
            min={1}
            max={31}
            paddingLeft="20px"
            w="120px"
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Box>日</Box>
        </HStack>
      </Box>

      {/* <Box __css={formStyles.formItemHead}>研究実施場所</Box>

      <Box margin="30px">
        <Input
          {...register("location", {
            required: {
              value: true,
              message: "研究実施場所を入力してください",
            },
          })}
        />
        <Box __css={formStyles.errorText}>{errors.location?.message}</Box>
      </Box> */}
    </Box>
  );
}

export const PeriodOfCellUseFormStyles: ComponentMultiStyleConfig = {
  parts: ["inputBox"],
  baseStyle: {
    inputBox: {
      w: "1000px",
      h: "200px",
      border: "1px",
      borderColor: "gray.400",
      padding: "30px",
    },
  },
};
