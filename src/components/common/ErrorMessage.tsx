import React from "react";
import { Typography } from "@mui/material";

type Props = {
  message: string;
};

export const ErrorMessage: React.FC<Props> = ({ message }) => (
  <Typography
    variant="h4"
    component="p"
    sx={{ color: "#ff4c4c", textAlign: "center", marginTop: "20px" }}
  >
    {message}
  </Typography>
);
