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
  name: string;
  job: string;
  phone: string;
  email: string;
};

export function ContactForm({ setIsCompleteForm }: Props) {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const contactFormStyles = useMultiStyleConfig("ContactForm", {});
  const formStyles = useMultiStyleConfig("Form", {});
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const watchName = watch("name", "");
  const watchJob = watch("job", "");
  const watchPhone = watch("phone", "");
  const watchEmail = watch("email", "");

  //wacth関数を用いて入力値が変更されるたびにstateに登録
  //(onChangeはReact-Hook-Formを使用すると使えない)
  useEffect(() => {
    if (
      watchName !== "" &&
      watchJob !== "" &&
      watchPhone !== "" &&
      watchEmail !== "" &&
      !errors.name &&
      !errors.job &&
      !errors.phone &&
      !errors.email
    ) {
      setIsCompleteForm((isCompleteForm) => {
        //「連絡先」はisCompleteFormのindex=0に相当
        return isCompleteForm.map((elem, index) => (index === 0 ? true : elem));
      });
    } else {
      setIsCompleteForm((isCompleteForm) => {
        return isCompleteForm.map((elem, index) =>
          index === 0 ? false : elem
        );
      });
    }
    setJob(watchJob);
    setName(watchName);
    setPhone(watchPhone);
    setEmail(watchEmail);
  }, [
    watchName,
    watchJob,
    watchPhone,
    watchEmail,
    errors.name,
    errors.job,
    errors.phone,
    errors.email,
    setIsCompleteForm,
  ]);

  return (
    <Box __css={contactFormStyles.inputBox}>
      <Box __css={formStyles.formItemHead}>連絡先</Box>

      <Table variant={"unstyled"}>
        <Tbody>
          <Tr>
            <Td>
              <FormLabel>氏名</FormLabel>
              <Input
                {...register("name", {
                  required: {
                    value: true,
                    message: "氏名を入力してください",
                  },
                })}
              />

              <Box __css={formStyles.errorText}>{errors.name?.message}</Box>
            </Td>

            <Td>
              <FormLabel>所属・職名</FormLabel>
              <Input
                {...register("job", {
                  required: {
                    value: true,
                    message: "所属・職名を入力してください",
                  },
                })}
              />

              {/* データ検証に失敗するとerrorsが返され、登録した名前で取り出せる */}

              <Box __css={formStyles.errorText}>{errors.job?.message}</Box>
            </Td>
          </Tr>

          <Tr>
            <Td>
              <FormLabel>電話</FormLabel>
              <Input
                {...register("phone", {
                  required: {
                    value: true,
                    message: "電話番号を入力してください",
                  },
                  pattern: {
                    value: /^0[-0-9]{9,12}$/,
                    message: "電話番号を正しく入力してください (例)00012345678",
                  },
                })}
              />

              <Box __css={formStyles.errorText}>{errors.phone?.message}</Box>
            </Td>

            <Td>
              <FormLabel>Email</FormLabel>
              <Input
                {...register("email", {
                  required: {
                    value: true,
                    message: "Emailを入力してください",
                  },
                  pattern: {
                    value: /^\S+@\S+$/,
                    message:
                      "Emailを正しく入力してください (例)example@mail.com",
                  },
                })}
              />

              {/* データ検証に失敗するとerrorsが返され、登録した名前で取り出せる */}

              <Box __css={formStyles.errorText}>{errors.email?.message}</Box>
            </Td>
          </Tr>
        </Tbody>
      </Table>
      {/* register関数の呼び出しにより、フォーム入力の要素を引数の名前で登録する */}
    </Box>
  );
}

export const ContactFormStyles: ComponentMultiStyleConfig = {
  parts: ["inputBox"],
  baseStyle: {
    inputBox: {
      w: "1000px",
      h: "350px",
      border: "1px",
      borderColor: "gray.400",
      padding: "30px",
    },
  },
};
