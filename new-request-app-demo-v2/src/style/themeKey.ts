import { PeriodOfCellUseFormStyles } from "./../components/Form/PrimaryForm/Item/PeriodOfCellUseForm";
import { LocationFormStyles } from "./../components/Form/PrimaryForm/Item/LocationForm";
import { ReasonOfCellUseFormStyles } from "./../components/Form/PrimaryForm/Item/ReasonOfCellUse";
import { OverviewOfPlanFormStyles } from "./../components/Form/PrimaryForm/Item/OverviewOfPlanForm";
import { TaskNameFormStyles } from "./../components/Form/PrimaryForm/Item/TaskNameForm";
import { CellUsePurposeFormStyles } from "./../components/Form/PrimaryForm/Item/CellUsePurposeForm";
import { CellNoFormStyles } from "./../components/Form/PrimaryForm/Item/CellNoForm";
import { SubmitButtons, SubmitButtonStyles } from "../components/SubmitButtons";
import { extendTheme } from "@chakra-ui/react";
import { Button } from "./ButtonStyle";
import { Input } from "./InputStyle";
import { FormStyles } from "./FormStyle";
import { ContactFormStyles } from "../components/Form/PrimaryForm/Item/ContactForm";
import { CellNoForm } from "../components/Form/PrimaryForm/Item/CellNoForm";
import {
  PartnerForm,
  PartnerFormStyles,
} from "../components/Form/PrimaryForm/Item/PartnerForm";
import { CellProviderFormStyles } from "../components/Form/PrimaryForm/Item/CellProviderForm";

export const theme = extendTheme({
  components: {
    Button: Button,
    Input: Input,
    SubmitButtons: SubmitButtonStyles,
    Form: FormStyles,
    ContactForm: ContactFormStyles,
    CellNoForm: CellNoFormStyles,
    PartnerForm: PartnerFormStyles,
    CellProviderForm: CellProviderFormStyles,
    CellUsePurposeForm: CellUsePurposeFormStyles,
    TaskNameForm: TaskNameFormStyles,
    OverviewOfPlanForm: OverviewOfPlanFormStyles,
    ReasonOfCellUseForm: ReasonOfCellUseFormStyles,
    LocationForm: LocationFormStyles,
    PeriodOfCellUseForm: PeriodOfCellUseFormStyles,
  },
});
