import {
  Input as InputChakra,
  FormControl,
  FormLabel,
  InputProps
} from "@chakra-ui/react";

type Props = {
  name: string;
  label: string;
} & InputProps;

const Input = ({ name, type, label }: Props) => {
  return (
    <FormControl>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <InputChakra
        id={name}
        name={name}
        type={type}
        focusBorderColor="pink.500"
        bgColor="gray.900"
        variant={"filled"}
        _hover={{
          bgColor: "gray.900"
        }}
      />
    </FormControl>
  );
};

export { Input };
