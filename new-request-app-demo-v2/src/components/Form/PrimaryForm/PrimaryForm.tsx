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
import { SubmitButtons } from "../../SubmitButtons";
import { CellNoForm } from "./Item/CellNoForm";
import { CellProviderForm } from "./Item/CellProviderForm";
import { CellUsePurposeForm } from "./Item/CellUsePurposeForm";
import { ContactForm } from "./Item/ContactForm";
import { LocationForm } from "./Item/LocationForm";
import { OverviewOfPlanForm } from "./Item/OverviewOfPlanForm";

import { PartnerForm } from "./Item/PartnerForm";
import { PeriodOfCellUseForm } from "./Item/PeriodOfCellUseForm";
import { ReasonOfCellUseForm } from "./Item/ReasonOfCellUse";
import { TaskNameForm } from "./Item/TaskNameForm";

type Props = {
  onProgressButtonClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

type Inputs = {
  name: string;
  job: string;
  phone: string;
  email: string;
};

export function PrimaryForm({ onProgressButtonClick }: Props) {
  //残りの入力項目の数の初期値
  const numOfInput = 13;

  //残りの入力項目の数
  const [restOfInput, setRestOfInput] = useState(numOfInput);

  //各入力ブロックにエラーがあるかどうか
  const [isCompleteForm, setIsCompleteForm] = useState([
    false,
    false,
    false,
    false,
    true,
    false,
    false,
    false,
    false,
    true,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    //入力チェックをクリアしたフォームの数
    let numOfIsCompleteForm = 0;

    //残りの入力項目数を計算
    isCompleteForm.forEach((elem, index) => {
      if (elem) {
        numOfIsCompleteForm++;
      }
    });
    setRestOfInput(numOfInput - numOfIsCompleteForm);
  }, [isCompleteForm]);

  return (
    <VStack>
      <ContactForm setIsCompleteForm={setIsCompleteForm} />
      <CellNoForm setIsCompleteForm={setIsCompleteForm} />
      <PartnerForm setIsCompleteForm={setIsCompleteForm} />
      <CellProviderForm setIsCompleteForm={setIsCompleteForm} />
      <CellUsePurposeForm />
      <TaskNameForm setIsCompleteForm={setIsCompleteForm} />
      <OverviewOfPlanForm setIsCompleteForm={setIsCompleteForm} />
      <ReasonOfCellUseForm setIsCompleteForm={setIsCompleteForm} />
      <LocationForm setIsCompleteForm={setIsCompleteForm} />
      <PeriodOfCellUseForm />
      <SubmitButtons
        onClick={onProgressButtonClick}
        restOfInput={restOfInput}
      />
    </VStack>
  );
}
