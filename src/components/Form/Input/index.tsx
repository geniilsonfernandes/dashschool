import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input as InputChakra,
  InputGroup,
  InputProps,
  InputRightElement
} from "@chakra-ui/react";
import { useState } from "react";

import { RiEyeFill, RiEyeCloseFill } from "react-icons/ri";

type Props = {
  name: string;
  label: string;
  helperText?: string;
  error?: boolean;
} & InputProps;

const Input = ({
  name,
  type,
  label,
  placeholder,
  helperText,
  error,
  ...props
}: Props) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <FormControl>
      <FormLabel htmlFor={name} color={error ? "red.500" : "white"}>
        {label}
      </FormLabel>
      <InputGroup>
        <InputChakra
          id={name}
          name={name}
          type={
            type === "password" && show
              ? "text"
              : type === "password"
              ? "password"
              : type
          }
          borderColor={error ? "red.500" : "gray.900"}
          focusBorderColor={error ? "red.500" : "pink.500"}
          bgColor="gray.900"
          variant={"filled"}
          placeholder={placeholder}
          _hover={{
            bgColor: "gray.900"
          }}
          paddingRight={type === "password" ? "4.5rem" : "0"}
          {...props}
        />
        {type === "password" && (
          <InputRightElement mr="0.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={handleClick}
              colorScheme="whiteAlpha"
            >
              {show ? <RiEyeFill /> : <RiEyeCloseFill />}
            </Button>
          </InputRightElement>
        )}
      </InputGroup>
      <FormHelperText color={error ? "red.500" : "white"}>
        {helperText}
      </FormHelperText>
    </FormControl>
  );
};

export { Input };
