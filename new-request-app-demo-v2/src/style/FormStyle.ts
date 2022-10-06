import { ComponentMultiStyleConfig } from "@chakra-ui/react";

export const FormStyles: ComponentMultiStyleConfig = {
  parts: ["formItemHead", "formItemText", "errorText"],
  baseStyle: {
    formItemHead: {
      fontWeight: "bold",
    },
    formItemText: {
      margin: "5px",
    },
    errorText: {
      color: "red",
      h: "30px",
      w: "300px",
    },
  },
};
