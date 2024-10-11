import React from "react";
import { Box } from "@chakra-ui/react";
function SpinnerFull() {
  return (
    <Box
      display={"flex"}
      height="100vh"
      alignItems={"center"}
      justifyContent={"center"}
    >
      <div className="spinner"></div>
    </Box>
  );
}

export default SpinnerFull;
