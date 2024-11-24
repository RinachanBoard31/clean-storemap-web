import React from "react";
import { Typography } from "@mui/material";

export const LoadingIndicator: React.FC = () => (
  <Typography
    variant="h4"
    component="p"
    sx={{ color: "#646cffaa", textAlign: "center", marginTop: "20px" }}
  >
    Loading...
  </Typography>
);
