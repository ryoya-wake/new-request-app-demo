import {
  Box,
  Button,
  Center,
  ChakraProvider,
  extendTheme,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Form from "./components/Form/Form";
import Header from "./components/Header";

import Step from "./components/Step";
import { SubmitButtons } from "./components/SubmitButtons";
import { theme } from "./style/themeKey";

function App() {
  const [step, setStep] = useState(1);
  // const [restOfInput, setRestOfInput] = useState(2);
  const onProgressButtonClick = () => {
    setStep(step + 1);
  };
  return (
    <div className="App">
      <ChakraProvider theme={theme}>
        <VStack>
          <Header />

          <Box w={"90%"} h={"100px"}>
            <Step step={step} />
          </Box>

          <Box w={"80%"} h={"5000px"}>
            <Form onProgressButtonClick={onProgressButtonClick} />
          </Box>
        </VStack>
      </ChakraProvider>
    </div>
  );
}

export default App;
