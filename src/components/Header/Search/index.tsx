import { axiosInstance, Endpoints } from "@/api";
import ResultItem from "@/components/ResultItem";
import {
  Box,
  Button,
  Center,
  Divider,
  Fade,
  Flex,
  Icon,
  Input,
  Spinner,
  Stack,
  Text
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { RiSearchLine } from "react-icons/ri";

type SearchType = "student" | "courses";

const Search = () => {
  const [searchType, setSearchType] = useState<SearchType>("student");
  const [searchValue, setSearchValue] = useState("");
  const [loadding, setLoadding] = useState(false);
  const resultEl = useRef<HTMLDivElement>(null);
  const [results, setResults] = useState<
    | {
        id: string;
        name: string;
      }[]
    | null
  >();

  const handleSearchType = (type: SearchType) => {
    setSearchType(type);
  };

  const handleSearch = async () => {
    try {
      setLoadding(true);
      const endpoint =
        searchType === "student"
          ? Endpoints.student.list()
          : Endpoints.course.list();

      const { data } = await axiosInstance.get(endpoint, {
        params: {
          filter: searchValue
        }
      });

      const mappingResults = data.items.map((item: any) => ({
        id: item.id,
        name: item.name
      }));

      setResults(mappingResults);
      setLoadding(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadding(false);
    }
  };

  const handleClearSearch = () => {
    setSearchValue("");
    setResults(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        resultEl.current &&
        !resultEl.current.contains(event.target as Node)
      ) {
        setResults(null);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <Box position="relative">
      <Flex
        as="label"
        flex="1"
        paddingY="4"
        paddingLeft={4}
        paddingRight={4}
        alignSelf="center"
        align="center"
        color="gray.200"
        position="relative"
        bg="gray.800"
        borderRadius="full"
        maxWidth={400}
      >
        <Button
          height="20px"
          bg="gray.700"
          padding={4}
          _hover={{ bg: "gray.600" }}
        >
          <Text
            display="inline-flex"
            fontWeight="bold"
            fontSize="12px"
            color="gray.50"
            onClick={() =>
              handleSearchType(searchType === "student" ? "courses" : "student")
            }
          >
            Buscar por: {searchType === "student" ? "Alunos" : "Cursos"}
          </Text>
        </Button>

        <Center height="16px" padding=" 0 8px">
          <Divider orientation="vertical" />
        </Center>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <Input
            color="gray.50"
            variant="unstyled"
            marginRight="4"
            placeholder="O que você procura?"
            _placeholder={{ color: "gray.400" }}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </form>
        {loadding ? (
          <>
            <Spinner size="sm" />
          </>
        ) : (
          <Icon
            cursor="pointer"
            as={RiSearchLine}
            fontSize="20"
            onClick={() => handleSearch()}
          />
        )}
      </Flex>

      <Fade in={results ? true : false}>
        <Flex
          position="absolute"
          right="0"
          mt={2}
          bg="gray.800"
          borderRadius="xl"
          width="100%"
          zIndex={10}
          borderWidth="1px"
          borderStyle="solid"
          borderColor="gray.700"
          ref={resultEl}
        >
          <Box
            fontWeight="bold"
            color="gray.400"
            width="100%"
            fontSize="small"
            padding={4}
          >
            <Flex justifyContent="space-between">
              <Text fontWeight="bold" color="gray.400" fontSize="small">
                Resultados:
              </Text>
              <Text
                cursor="pointer"
                fontWeight="bold"
                color="gray.400"
                fontSize="small"
                onClick={handleClearSearch}
              >
                Limpar
              </Text>
            </Flex>
            <Stack spacing="2" mt="4" align="stretch">
              {results && results.length === 0 && (
                <Text> Nenhum resultado encontrado </Text>
              )}

              {results?.map((item) => (
                <ResultItem
                  name={item.name}
                  key={item.id}
                  id={item.id}
                  type={searchType}
                />
              ))}
            </Stack>
          </Box>
        </Flex>
      </Fade>
    </Box>
  );
};

export default Search;
