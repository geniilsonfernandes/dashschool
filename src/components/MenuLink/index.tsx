import { Link as ChakraLink, Text } from "@chakra-ui/react";
import { ActiveLink } from "../ActiveLink";

type MenuLinkProps = {
  icon: React.ReactElement;
  name: string;
  href: string;
};
const MenuLink = ({ name, href, icon }: MenuLinkProps) => {
  return (
    <ActiveLink href={href} passHref>
      <ChakraLink as={"span"} display="flex" alignItems="center">
        {icon}
        <Text ml="4" fontWeight="medium">
          {name}
        </Text>
      </ChakraLink>
    </ActiveLink>
  );
};

export default MenuLink;
