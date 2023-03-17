import {
  FormControl,
  FormHelperText,
  FormLabel,
  InputGroup,
  Textarea as TextareaChakra,
  TextareaProps
} from "@chakra-ui/react";

type Props = {
  name: string;
  label: string;
  helperText?: string;
  error?: boolean;
} & TextareaProps;

const Textarea = ({
  name,

  label,
  placeholder,
  helperText,
  error,
  ...props
}: Props) => {
  return (
    <FormControl>
      <FormLabel htmlFor={name} color={error ? "red.500" : "white"}>
        {label}
      </FormLabel>
      <InputGroup>
        <TextareaChakra
          size="sm"
          resize="none"
          borderColor={error ? "red.500" : "gray.900"}
          focusBorderColor={error ? "red.500" : "facebook.500"}
          bgColor="gray.900"
          variant={"filled"}
          placeholder={placeholder}
          _hover={{
            bgColor: "gray.900"
          }}
          onChange={props.onChange}
        />
      </InputGroup>
      <FormHelperText color={error ? "red.500" : "white"}>
        {helperText}
      </FormHelperText>
    </FormControl>
  );
};

export { Textarea };
