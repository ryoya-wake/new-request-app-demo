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

type Props = {
  setIsCompleteForm: React.Dispatch<React.SetStateAction<boolean[]>>;
};
type Inputs = {
  provider1: string;
  provider2: string;
  providedCell1: string;
  providedCell2: string;
};

export function CellProviderForm({ setIsCompleteForm }: Props) {
  const [value, setValue] = useState("1");
  const [isCiRAF, setIsCiRAF] = useState(true);
  const [provider1, setProvider1] = useState("");
  const [provider2, setProvider2] = useState("");
  const [providedCell1, setProvidedCell1] = useState("");
  const [providedCell2, setProvidedCell2] = useState("");

  const formStyles = useMultiStyleConfig("Form", {});
  const cellProviderFormStyles = useMultiStyleConfig("CellProviderForm", {});
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
      setIsCiRAF(true);
    } else if (value === "2") {
      setIsCiRAF(false);
    }
  }, [value]);

  const watchProvider1 = watch("provider1", "");
  const watchProvider2 = watch("provider2", "");
  const watchProvidedCell1 = watch("providedCell1", "");
  const watchProvidedCell2 = watch("providedCell2", "");
  // const watchCellName = watch("cellName", "");

  // //wacth関数を用いて入力値が変更されるたびにstateに登録
  // //(onChangeはReact-Hook-Formを使用すると使えない)
  useEffect(() => {
    if (
      watchProvider1 !== "" &&
      watchProvider2 !== "" &&
      watchProvidedCell1 !== "" &&
      watchProvidedCell2 !== "" &&
      !errors.provider1 &&
      !errors.provider2 &&
      !errors.providedCell1 &&
      !errors.providedCell2
    ) {
      setIsCompleteForm((isCompleteForm) => {
        //「使用を希望するIPS細胞等の提供元」はisCompleteFormのindex=3に相当
        return isCompleteForm.map((elem, index) => (index === 3 ? true : elem));
      });
    } else {
      setIsCompleteForm((isCompleteForm) => {
        return isCompleteForm.map((elem, index) =>
          index === 3 ? false : elem
        );
      });
    }
    setProvider1(watchProvider1);
    setProvider2(watchProvider2);
    setProvidedCell1(watchProvidedCell1);
    setProvidedCell2(watchProvidedCell2);
  }, [
    errors.provider1,
    errors.provider2,
    errors.providedCell1,
    errors.providedCell2,
    watchProvider1,
    watchProvider2,
    watchProvidedCell1,
    watchProvidedCell2,
    setIsCompleteForm,
  ]);

  const hideInputElement = (
    <Box>
      <Box>
        <HStack>
          <Box paddingBottom="10px">CiRA-F</Box>
          <Box
            paddingBottom={"30px"}
            paddingLeft={"10px"}
            paddingRight={"10px"}
          >
            <Box>①</Box>
            <Box>→</Box>
          </Box>
          <Box>
            <FormLabel>機関名1</FormLabel>
            <Input
              {...register("provider1", {
                required: {
                  value: true,
                  message: "提供先機関を入力してください",
                },
              })}
            ></Input>
            <Box __css={formStyles.errorText}>{errors.provider1?.message}</Box>
          </Box>
          <Box
            paddingBottom={"30px"}
            paddingLeft={"10px"}
            paddingRight={"10px"}
          >
            <Box>②</Box>
            <Box>→</Box>
          </Box>
          <Box>
            <FormLabel>機関名2</FormLabel>
            <Input
              {...register("provider2", {
                required: {
                  value: true,
                  message: "提供先機関を入力してください",
                },
              })}
            ></Input>
            <Box __css={formStyles.errorText}>{errors.provider2?.message}</Box>
          </Box>
        </HStack>

        <HStack spacing={"30px"}>
          <Box>
            <FormLabel>①(渡された株名1)</FormLabel>
            <Input
              {...register("providedCell1", {
                required: {
                  value: true,
                  message: "渡された株名を入力してください",
                },
              })}
            ></Input>
            <Box __css={formStyles.errorText}>
              {errors.providedCell1?.message}
            </Box>
          </Box>

          <Box>
            <FormLabel>②(渡された株名2)</FormLabel>
            <Input
              {...register("providedCell2", {
                required: {
                  value: true,
                  message: "渡された株名を入力してください",
                },
              })}
            ></Input>
            <Box __css={formStyles.errorText}>
              {errors.providedCell2?.message}
            </Box>
          </Box>
        </HStack>
      </Box>
    </Box>
  );

  return (
    <Box __css={cellProviderFormStyles.inputBox}>
      <Box __css={formStyles.formItemHead}>使用を希望するIPS細胞等の提供元</Box>
      <RadioGroup value={value} onChange={setValue}>
        <Table variant={"unstyled"}>
          <Tbody>
            <Tr h="50px">
              <Td h="50px">
                <Box>
                  <Radio value="1">京都大学iPS細胞研究財団(CiRA-F)</Radio>
                  <Fade in={value === "1"}>
                    <Box __css={cellProviderFormStyles.hideInput}>
                      {value === "1" && hideInputElement}
                    </Box>
                  </Fade>
                </Box>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Box>
                  <Radio value="2">
                    CiRA-F以外(すでに入手済みの細胞を利用する場合)
                  </Radio>
                  <Fade in={value === "2"}>
                    <Box __css={cellProviderFormStyles.hideInput}>
                      {value === "2" && hideInputElement}
                    </Box>
                  </Fade>
                </Box>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </RadioGroup>
    </Box>
  );
}

export const CellProviderFormStyles: ComponentMultiStyleConfig = {
  parts: ["inputBox", "hideInput"],
  baseStyle: {
    inputBox: {
      w: "1000px",
      border: "1px",
      borderColor: "gray.400",
      padding: "30px",
    },
    hideInput: {
      h: "200px",
      paddingLeft: "10px",
      marginTop: "20px",
      marginLeft: "20px",
    },
  },
};
