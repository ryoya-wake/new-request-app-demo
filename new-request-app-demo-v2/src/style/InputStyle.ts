import type { ComponentStyleConfig } from "@chakra-ui/theme";

// You can also use the more specific type for
// a single part component: ComponentSingleStyleConfig
export const Input: ComponentStyleConfig = {
  // The styles all button have in common
  baseStyle: {
    w: "30px",
  },
  defaultProps: { size: "md" },
};
