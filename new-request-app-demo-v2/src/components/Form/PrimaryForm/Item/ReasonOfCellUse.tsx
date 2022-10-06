import {
  Box,
  ComponentMultiStyleConfig,
  FormControl,
  FormLabel,
  Input,
  Table,
  Tbody,
  Td,
  Text,
  Textarea,
  Tr,
  useMultiStyleConfig,
  VStack,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Props = {
  setIsCompleteForm: React.Dispatch<React.SetStateAction<boolean[]>>;
};
type Inputs = {
  reason: string;
};

export function ReasonOfCellUseForm({ setIsCompleteForm }: Props) {
  const reasonOfCellUseFormStyles = useMultiStyleConfig(
    "OverviewOfPlanForm",
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
  const watchReason = watch("reason", "");

  //wacth関数を用いて入力値が変更されるたびにstateに登録
  //(onChangeはReact-Hook-Formを使用すると使えない)
  useEffect(() => {
    if (watchReason !== "" && !errors.reason) {
      setIsCompleteForm((isCompleteForm) => {
        //「細胞使用の目的」はisCompleteFormのindex=7に相当
        return isCompleteForm.map((elem, index) => (index === 7 ? true : elem));
      });
    } else {
      setIsCompleteForm((isCompleteForm) => {
        return isCompleteForm.map((elem, index) =>
          index === 7 ? false : elem
        );
      });
    }
  }, [watchReason, errors.reason, setIsCompleteForm]);

  return (
    <Box __css={reasonOfCellUseFormStyles.inputBox}>
      <Box __css={formStyles.formItemHead}>iPS細胞ストックを必要とする理由</Box>

      <Box margin="30px">
        <Textarea
          {...register("reason", {
            required: {
              value: true,
              message: "入力してください",
            },
          })}
        />
        <Box __css={formStyles.errorText}>{errors.reason?.message}</Box>
      </Box>
    </Box>
  );
}

export const ReasonOfCellUseFormStyles: ComponentMultiStyleConfig = {
  parts: ["inputBox"],
  baseStyle: {
    inputBox: {
      w: "1000px",
      h: "240px",
      border: "1px",
      borderColor: "gray.400",
      padding: "30px",
    },
  },
};
