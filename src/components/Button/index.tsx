import { stylesConstants } from "@/styles";
import { Button as CButton, ButtonProps } from "@chakra-ui/react";
import React from "react";

interface Props extends ButtonProps {
  children: React.ReactNode;
}
const Button = ({ children, ...props }: Props) => {
  return (
    <CButton {...props} colorScheme={stylesConstants.COLOR_SCHEME}>
      {children}
    </CButton>
  );
};

export default Button;
