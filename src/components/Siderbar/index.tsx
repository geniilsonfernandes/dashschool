import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Icon,
  Link as ChakraLink,
  Stack,
  Text,
  useBreakpointValue
} from "@chakra-ui/react";
import { RiContactsLine, RiDashboardLine } from "react-icons/ri";
import { ActiveLink } from "../ActiveLink";
import { useSidebarDrawer } from "../contexts/SidebarDrawerContext";

const Siderbar = () => {
  const { isOpen, onClose } = useSidebarDrawer();
  const isDrawerSidebar = useBreakpointValue({
    base: true,
    lg: false
  });

  if (isDrawerSidebar) {
    return (
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent bg="gray.900" p="4">
            <DrawerCloseButton mt="6" />
            <DrawerHeader>
              <Text fontWeight="bold" color="gray.400" fontSize="small">
                Navegação
              </Text>
            </DrawerHeader>
            <DrawerBody>
              <Stack spacing="12" align="flex-start">
                <Box fontWeight="bold" color="gray.400" fontSize="small">
                  <Text fontWeight="bold" color="gray.400" fontSize="small">
                    Geral
                  </Text>
                  <Stack spacing="4" mt="8" align="stretch">
                    <ActiveLink href="/dashboard" passHref>
                      <ChakraLink display="flex" alignItems="center">
                        <Icon as={RiDashboardLine} />
                        <Text ml="4" fontWeight="medium">
                          Dashboard
                        </Text>
                      </ChakraLink>
                    </ActiveLink>

                    <ActiveLink href="/users" passHref shouldMatchExactHref>
                      <ChakraLink display="flex" alignItems="center">
                        <Icon as={RiContactsLine} />
                        <Text ml="4" fontWeight="medium">
                          usuários
                        </Text>
                      </ChakraLink>
                    </ActiveLink>
                  </Stack>
                </Box>
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    );
  }
  return (
    <Box as="aside" w="64" mr="8">
      <Stack spacing="12" align="flex-start">
        <Box fontWeight="bold" color="gray.400" fontSize="small">
          <Text fontWeight="bold" color="gray.400" fontSize="small">
            Geral
          </Text>
          <Stack spacing="4" mt="8" align="stretch">
            <ChakraLink display="flex" alignItems="center">
              <Icon as={RiDashboardLine} />
              <Text ml="4" fontWeight="medium">
                Dashboard
              </Text>
            </ChakraLink>
            <ChakraLink display="flex" alignItems="center">
              <Icon as={RiContactsLine} />
              <Text ml="4" fontWeight="medium">
                usuários
              </Text>
            </ChakraLink>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default Siderbar;
