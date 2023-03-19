import { stylesConstants } from "@/styles";
import { Button, Flex, Text } from "@chakra-ui/react";
import { RiAddLine, RiCloseLine } from "react-icons/ri";

type StudantCardProps = {
  name: string;
  email: string;
  onAdd?: (id: string) => void;
  onRemove?: (id: string) => void;
  isSelected?: boolean;
  nofill?: boolean;
  id: string;
};

const StudantCard = ({
  email,
  name,
  onAdd,
  onRemove,
  isSelected,
  nofill = false,
  id
}: StudantCardProps) => {
  const handleAdd = () => {
    onAdd && onAdd(id);
  };
  const handleRemove = () => {
    onRemove && onRemove(id);
  };

  return (
    <Flex
      width="100%"
      alignItems="center"
      p="2"
      borderRadius="8px"
      justifyContent="space-between"
      bg={isSelected && !nofill ? "green.300" : "gray.900"}
      _hover={{ bg: isSelected && !nofill ? "green.400" : "gray.700" }}
      transition="all 0.2s"
      _active={{
        transform: "scale(0.98)"
      }}
    >
      <Flex alignItems="center" gap={2}>
        <Text fontSize="small" fontWeight="bold">
          {name}
        </Text>
        -
        <Text fontSize="small" color="white.300">
          {email}
        </Text>
      </Flex>
      <Flex alignItems="center" gap={2}>
        {!isSelected && (
          <Button
            size="sm"
            bg="green.300"
            padding="2"
            onClick={handleAdd}
            _hover={{ bg: "green.400" }}
          >
            <RiAddLine />
          </Button>
        )}
        {isSelected && (
          <Button
            size="sm"
            colorScheme={stylesConstants.COLOR_SCHEME}
            padding="2"
            bg="red.600"
            _hover={{ bg: "red.700" }}
            onClick={handleRemove}
          >
            <RiCloseLine />
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default StudantCard;
