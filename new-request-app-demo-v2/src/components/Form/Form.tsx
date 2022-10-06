import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { PrimaryForm } from "./PrimaryForm/PrimaryForm";

type Props = {
  onProgressButtonClick: any;
};
function Form({ onProgressButtonClick }: Props) {
  return (
    <Box zIndex={"base"}>
      <Tabs>
        <TabList>
          <Tab>主研究者</Tab>
          <Tab>共同研究者</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Box>
              <PrimaryForm onProgressButtonClick={onProgressButtonClick} />
            </Box>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default Form;
