import { stylesConstants } from "@/styles";
import { Button, Flex, Text } from "@chakra-ui/react";
import { type } from "os";
import React from "react";
import { RiAddLine, RiCloseLine } from "react-icons/ri";

type StudantCardProps = {
  name: string;
  email: string;
  onAdd?: () => void;
  onRemove?: () => void;
  type?: "add" | "remove";
};

const StudantCard = ({
  email,
  name,
  onAdd,
  onRemove,
  type = "add"
}: StudantCardProps) => {
  const handleAdd = () => {
    onAdd && onAdd();
  };
  const handleRemove = () => {
    onRemove && onRemove();
  };

  return (
    <Flex
      width="100%"
      alignItems="center"
      p="2"
      borderRadius="8px"
      justifyContent="space-between"
      bg="gray.900"
    >
      <Flex alignItems="center" gap={2}>
        <Text fontWeight="normal">{name}</Text>|
        <Text fontSize="small" color="gray.300">
          {email}
        </Text>
      </Flex>
      <Flex alignItems="center" gap={2}>
        {type === "add" && (
          <Button
            size="sm"
            colorScheme={stylesConstants.COLOR_SCHEME}
            padding="2"
          >
            <RiAddLine />
          </Button>
        )}
        {type === "remove" && (
          <Button
            size="sm"
            colorScheme={stylesConstants.COLOR_SCHEME}
            padding="2"
            bg="red.600"
            _hover={{ bg: "red.400" }}
          >
            <RiCloseLine />
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default StudantCard;
