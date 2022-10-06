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
  taskName: string;
};

export function TaskNameForm({ setIsCompleteForm }: Props) {
  const taskNameFormStyles = useMultiStyleConfig("TaskNameForm", {});
  const formStyles = useMultiStyleConfig("Form", {});
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const watchTaskName = watch("taskName", "");

  //wacth関数を用いて入力値が変更されるたびにstateに登録
  //(onChangeはReact-Hook-Formを使用すると使えない)
  useEffect(() => {
    if (watchTaskName !== "" && !errors.taskName) {
      setIsCompleteForm((isCompleteForm) => {
        //「課題名」はisCompleteFormのindex=5に相当
        return isCompleteForm.map((elem, index) => (index === 5 ? true : elem));
      });
    } else {
      setIsCompleteForm((isCompleteForm) => {
        return isCompleteForm.map((elem, index) =>
          index === 5 ? false : elem
        );
      });
    }
  }, [watchTaskName, errors.taskName, setIsCompleteForm]);

  return (
    <Box __css={taskNameFormStyles.inputBox}>
      <Box __css={formStyles.formItemHead}>
        課題名(共同研究の場合は共通の課題名)
      </Box>

      <Box margin="30px">
        <Input
          {...register("taskName", {
            required: {
              value: true,
              message: "課題名を入力してください",
            },
          })}
        />
        <Box __css={formStyles.errorText}>{errors.taskName?.message}</Box>
      </Box>
    </Box>
  );
}

export const TaskNameFormStyles: ComponentMultiStyleConfig = {
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
