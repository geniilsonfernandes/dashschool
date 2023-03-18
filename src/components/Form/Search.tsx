import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  Spinner
} from "@chakra-ui/react";
import { RiSearchLine } from "react-icons/ri";

type Props = {
  name: string;
  label: string;
  helperText?: string;
  error?: boolean;
  isLoading?: boolean;
  onClickToSearch?: () => void;
} & InputProps;

const Search = ({
  error,
  name,
  label,
  onClickToSearch,
  isLoading = false,
  ...props
}: Props) => {
  return (
    <FormControl>
      <FormLabel htmlFor={name} color={error ? "red.500" : "white"}>
        {label}
      </FormLabel>
      <InputGroup>
        <Input
          _hover={{
            bgColor: "gray.900"
          }}
          borderColor={error ? "red.500" : "gray.900"}
          focusBorderColor={error ? "red.500" : "facebook.500"}
          bgColor="gray.900"
          variant={"filled"}
          cursor={isLoading ? "not-allowed" : "pointer"}
          opacity={isLoading ? 0.5 : 1}
          {...props}
        />
        <InputRightElement
          mr="0.5rem"
          borderRadius="50%"
          onClick={onClickToSearch}
          cursor={isLoading ? "not-allowed" : "pointer"}
        >
          {isLoading ? (
            <Spinner size="sm" color="#494949" />
          ) : (
            <RiSearchLine color="#494949" />
          )}
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
};

export default Search;
