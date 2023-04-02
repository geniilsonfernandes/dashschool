import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Icon,
  Text,
  useBreakpointValue
} from "@chakra-ui/react";
import { RiBookLine, RiContactsLine, RiDashboardLine } from "react-icons/ri";
import { useSidebarDrawer } from "@/contexts/SidebarDrawerContext";
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

  const menus = [
    {
      id: "1",
      title: "Geral",
      links: [
        {
          name: "Dashboard",
          href: "/dashboard",
          icon: <Icon as={RiDashboardLine} />
        }
      ]
    },
    {
      id: "2",
      title: "Cadastros",
      links: [
        {
          name: "Alunos",
          href: "/student",
          icon: <Icon as={RiContactsLine} />
        },
        {
          name: "Cursos",
          href: "/courses",
          icon: <Icon as={RiBookLine} />
        }
      ]
    }
  ];

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
              {menus.map((menu) => (
                <MenuSection key={menu.id} title={menu.title}>
                  {menu.links.map((link) => (
                    <MenuLink
                      key={link.name}
                      href={link.href}
                      icon={link.icon}
                      name={link.name}
                    />
                  ))}
                </MenuSection>
              ))}
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    );
  }
  return (
    <Box as="aside" w="64" mr="8">
      {menus.map((menu) => (
        <MenuSection key={menu.id} title={menu.title}>
          {menu.links.map((link) => (
            <MenuLink
              key={link.name}
              href={link.href}
              icon={link.icon}
              name={link.name}
            />
          ))}
        </MenuSection>
      ))}
    </Box>
  );
};

export default Siderbar;
