import { Box, Divider, Text, useDisclosure, VStack } from "@chakra-ui/react";
import Search from "../Form/Search";
import StudantCard from "../StudantCard";

type GridStudantsCardProps = {
  children: React.ReactNode;
  title: string;
  type: "search" | "list";
};
const GridStudants = ({
  children,
  title,
  type = "list"
}: GridStudantsCardProps) => {
  return (
    <Box>
      {type === "search" ? (
        <Text fontSize="small" color="gray.300" padding="0 0 8px 8px">
          {title}
        </Text>
      ) : (
        <Text
          fontSize="16px"
          fontWeight="bold"
          color="white"
          padding="0 0 8px 8px"
        >
          {title}
        </Text>
      )}
      <VStack spacing="1">{children}</VStack>
    </Box>
  );
};

const SearchStudent = () => {
  const result = useDisclosure();

  const handleSearchStudent = () => {
    result.onOpen();
  };

  return (
    <Box>
      <Box
        display="flex"
        flexDirection="column"
        borderStyle="solid"
        borderWidth="1px"
        borderColor="gray.900"
        borderRadius="8px"
        padding="24px 16px"
      >
        <Search
          autoComplete="off"
          label="Pesquisar aluno | Digite o nome ou email do aluno"
          name="search_aluno"
          onClickToSearch={() => handleSearchStudent()}
        />
        {result.isOpen && (
          <>
            <Divider borderColor="gray.700" my="4" />
            <GridStudants title="Alunos encontrados " type="search">
              {[1, 2, 3].map((item) => (
                <StudantCard email="fdksdf" name="fdsfkj" key={item} />
              ))}
            </GridStudants>
          </>
        )}
      </Box>
      <Divider borderColor="gray.700" my="4" />
      <GridStudants title="Alunos neste curso" type="list">
        {[1, 2, 3].map((item) => (
          <StudantCard email="fdksdf" name="fdsfkj" key={item} type="remove" />
        ))}
      </GridStudants>
    </Box>
  );
};

export default SearchStudent;
