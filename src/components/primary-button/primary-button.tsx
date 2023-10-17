import { Button } from "@mui/material";
import { DotLoader } from "../loaders/dot-loader";
import { FC } from "react";

interface PrimaryButtonProps {
  width?: string;
  text: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  showLoader?: boolean;
}

export const PrimaryButton: FC<PrimaryButtonProps> = ({
  width = "100%",
  text,
  disabled = false,
  type = "button",
  showLoader = false,
}) => {
  return (
    <Button
      type={type}
      //   fullWidth
      disabled={disabled}
      variant="contained"
      sx={{
        width: width,
        height: "43px",
        fontSize: "12px",
        borderRadius: "0px",
        // fontFamily: "var(--fnt-primary)",
        fontWeight: 900,
        // letterSpacing: "-0.02rem",
        color: "white",
        // backgroundColor: "var(--clr-primary)",
        backgroundColor: "#748E63",

        "&:hover": {
          //   backgroundColor: "var(--clr-primary)",
          backgroundColor: "#748E63",
        },
      }}
    >
      {showLoader ? <DotLoader /> : text}
    </Button>
  );
};
