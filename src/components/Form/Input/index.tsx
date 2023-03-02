import {
  Input as InputChakra,
  FormControl,
  FormLabel,
  InputProps,
  FormHelperText,
  InputGroup,
  InputLeftAddon
} from "@chakra-ui/react";

type Props = {
  name: string;
  label: string;
  helperText?: string;
} & InputProps;

const Input = ({
  name,
  type,
  label,
  placeholder,
  helperText,
  ...props
}: Props) => {
  return (
    <FormControl>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <InputGroup>
        <InputChakra
          id={name}
          name={name}
          type={type}
          focusBorderColor="pink.500"
          bgColor="gray.900"
          variant={"filled"}
          placeholder={placeholder}
          _hover={{
            bgColor: "gray.900"
          }}
          {...props}
        />
      </InputGroup>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};

export { Input };
