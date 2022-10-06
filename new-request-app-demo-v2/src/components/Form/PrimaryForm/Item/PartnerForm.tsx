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
  SlideFade,
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
import { useForm, SubmitHandler } from "react-hook-form";

type Props = {
  setIsCompleteForm: React.Dispatch<React.SetStateAction<boolean[]>>;
};
type Inputs = {
  haveParter: boolean;
  partnerName: string;
};

export function PartnerForm({ setIsCompleteForm }: Props) {
  const [value, setValue] = useState("1");

  const [haveParter, setHavePartner] = useState(false);

  const [partnerName, setPartnerName] = useState("");

  const formStyles = useMultiStyleConfig("Form", {});
  const cellNoFormStyles = useMultiStyleConfig("CellNoForm", {});
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    if (value === "1") {
      setHavePartner(false);
    } else if (value === "2") {
      setHavePartner(true);
    }
  }, [value]);

  const watchPartnerName = watch("partnerName", "");

  //wacth関数を用いて入力値が変更されるたびにstateに登録
  //(onChangeはReact-Hook-Formを使用すると使えない)
  useEffect(() => {
    if ((watchPartnerName !== "" && !errors.partnerName) || value === "1") {
      setIsCompleteForm((isCompleteForm) => {
        //「共同研究先」はisCompleteFormのindex=2に相当
        return isCompleteForm.map((elem, index) => (index === 2 ? true : elem));
      });
    } else {
      setIsCompleteForm((isCompleteForm) => {
        return isCompleteForm.map((elem, index) =>
          index === 2 ? false : elem
        );
      });
    }
    setPartnerName(watchPartnerName);
  }, [watchPartnerName, errors.partnerName, setIsCompleteForm, value]);

  const hideInputElement = (
    <Box>
      <FormLabel>機関名</FormLabel>
      <Input
        {...register("partnerName", {
          required: {
            value: true,
            message: "機関名を入力してください",
          },
        })}
      ></Input>
      <Box __css={formStyles.errorText}>{errors.partnerName?.message}</Box>
    </Box>
  );

  return (
    <Box __css={cellNoFormStyles.inputBox}>
      <Box __css={formStyles.formItemHead}>共同研究先について</Box>
      <RadioGroup value={value} onChange={setValue} margin="30px">
        <HStack>
          <Radio value="1">無</Radio>
        </HStack>

        <HStack>
          <Radio value="2">有</Radio>
          <Fade in={value === "2"}>
            <Box __css={cellNoFormStyles.hideInput}>{hideInputElement}</Box>
          </Fade>
        </HStack>
      </RadioGroup>
    </Box>
  );
}

export const PartnerFormStyles: ComponentMultiStyleConfig = {
  parts: ["inputBox", "hideInput"],
  baseStyle: {
    inputBox: {
      w: "1000px",
      border: "1px",
      borderColor: "gray.400",
      padding: "30px",
    },
    hideInput: {
      h: "80px",
      paddingLeft: "10px",
    },
  },
};
