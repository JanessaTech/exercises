import { Box } from "@mui/material";
import ButtonDemo from "./components/ButtonDemo";
import CustomComponent from "./components/CustomComponent";
import FocusDemo from "./components/FocusDemo";
import StateClassDemo from "./components/StateClassDemo";
import StyledDemo from "./components/StyledDemo";


function App() {
  return (
    <Box>
      <ButtonDemo/>
      <StateClassDemo/>
      <StyledDemo/>
      <CustomComponent/>
      <FocusDemo/>
    </Box>
    
  );
}

export default App;