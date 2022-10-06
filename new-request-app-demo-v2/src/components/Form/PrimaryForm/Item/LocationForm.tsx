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
  location: string;
};

export function LocationForm({ setIsCompleteForm }: Props) {
  const locationFormStyles = useMultiStyleConfig("LocationForm", {});
  const formStyles = useMultiStyleConfig("Form", {});
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const watchLocation = watch("location", "");

  //wacth関数を用いて入力値が変更されるたびにstateに登録
  //(onChangeはReact-Hook-Formを使用すると使えない)
  useEffect(() => {
    if (watchLocation !== "" && !errors.location) {
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
  }, [watchLocation, errors.location, setIsCompleteForm]);

  return (
    <Box __css={locationFormStyles.inputBox}>
      <Box __css={formStyles.formItemHead}>研究実施場所</Box>

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
      </Box>
    </Box>
  );
}

export const LocationFormStyles: ComponentMultiStyleConfig = {
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
