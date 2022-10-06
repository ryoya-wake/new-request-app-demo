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
  overview: string;
};

export function OverviewOfPlanForm({ setIsCompleteForm }: Props) {
  const overviewOfPlanFormStyles = useMultiStyleConfig(
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
  const watchOverview = watch("overview", "");

  //wacth関数を用いて入力値が変更されるたびにstateに登録
  //(onChangeはReact-Hook-Formを使用すると使えない)
  useEffect(() => {
    if (watchOverview !== "" && !errors.overview) {
      setIsCompleteForm((isCompleteForm) => {
        //「課題名」はisCompleteFormのindex=6に相当
        return isCompleteForm.map((elem, index) => (index === 6 ? true : elem));
      });
    } else {
      setIsCompleteForm((isCompleteForm) => {
        return isCompleteForm.map((elem, index) =>
          index === 6 ? false : elem
        );
      });
    }
  }, [watchOverview, errors.overview, setIsCompleteForm]);

  return (
    <Box __css={overviewOfPlanFormStyles.inputBox}>
      <Box __css={formStyles.formItemHead}>計画の概要(200文字程度)</Box>

      <Box margin="30px">
        <Textarea
          {...register("overview", {
            required: {
              value: true,
              message: "入力してください",
            },
          })}
        />
        <Box __css={formStyles.errorText}>{errors.overview?.message}</Box>
      </Box>
    </Box>
  );
}

export const OverviewOfPlanFormStyles: ComponentMultiStyleConfig = {
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
