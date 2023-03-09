import {
  Box,
  Button,
  Flex,
  Icon,
  Td,
  Text,
  Tr,
  useBreakpointValue
} from "@chakra-ui/react";
import Link from "next/link";
import { RiPencilLine } from "react-icons/ri";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export type UserRowProps = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
};

const UserRow = ({ createdAt, email, id, name }: UserRowProps) => {
  const isDrawerSidebar = useBreakpointValue(
    {
      base: false,
      lg: true
    },
    {
      fallback: "lg"
    }
  );

  const data = parseISO(createdAt);
  const dataFormatada = format(data, "EEEE, d 'de' MMMM 'de' yyyy", {
    locale: ptBR
  });

  return (
    <Tr>
      {/* <Td px="2">
        <Checkbox colorScheme="facebook" />
      </Td> */}
      <Td>
        <Box>
          <Text fontWeight="bold">{name}</Text>
          <Text fontSize="small" color="gray.300">
            {email}
          </Text>
        </Box>
      </Td>
      {isDrawerSidebar && <Td>{dataFormatada}</Td>}
      <Td p="0">
        <Flex justify="flex-end">
          <Link href={`/student/edit/${id}`}>
            <Button
              size="sm"
              fontSize="sm"
              colorScheme="purple"
              leftIcon={<Icon as={RiPencilLine} />}
            >
              Editar
            </Button>
          </Link>
        </Flex>
      </Td>
    </Tr>
  );
};

export default UserRow;
