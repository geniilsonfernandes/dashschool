import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Text,
  Icon,
  useBreakpointValue
} from "@chakra-ui/react";
import Link from "next/link";
import { RiContactsLine, RiDashboardLine } from "react-icons/ri";
import { useSidebarDrawer } from "../contexts/SidebarDrawerContext";
import MenuLink from "../MenuLink";
import MenuSection from "../MenuSection";

const Siderbar = () => {
  const { isOpen, onClose } = useSidebarDrawer();
  const isDrawerSidebar = useBreakpointValue(
    {
      base: true,
      lg: false
    },
    {
      fallback: "lg"
    }
  );

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
              <MenuSection title="Geral">
                <MenuLink
                  href="/dashboard"
                  icon={<Icon as={RiDashboardLine} />}
                  name="Dashboard"
                />
                <MenuLink
                  href="/users"
                  icon={<Icon as={RiContactsLine} />}
                  name="Usuários"
                />
              </MenuSection>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    );
  }
  return (
    <Box as="aside" w="64" mr="8">
      <MenuSection title="Geral">
        <MenuLink
          href="/dashboard"
          icon={<Icon as={RiDashboardLine} />}
          name="Dashboard"
        />
        <MenuLink
          href="/users"
          icon={<Icon as={RiContactsLine} />}
          name="Usuários"
        />
      </MenuSection>
    </Box>
  );
};

export default Siderbar;
