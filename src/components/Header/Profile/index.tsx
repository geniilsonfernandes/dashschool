import {
  Avatar,
  Box,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text
} from "@chakra-ui/react";

type ProfileProps = {
  showProfileData?: boolean;
  name?: string;
  email?: string;
  onSignOut: () => void;
};

const Profile = ({
  showProfileData = true,
  name,
  email,
  onSignOut
}: ProfileProps) => {
  return (
    <Menu>
      <MenuButton>
        <div
          style={{
            display: "flex"
          }}
        >
          {showProfileData && (
            <Box marginRight="4" textAlign="right">
              <Text>{name}</Text>
              <Text color="gray.300" fontSize="small">
                {email}
              </Text>
            </Box>
          )}
          <Avatar size="md" name={name} src="" />
        </div>
      </MenuButton>

      <MenuList bg="gray.900">
        <MenuItem
          as="button"
          bg="gray.900"
          borderColor="gray.100"
          _hover={{
            bg: "gray.700",
            borderColor: "gray.100"
          }}
          _active={{
            bg: "gray.700",
            borderColor: "gray.100"
          }}
          onClick={onSignOut}
        >
          sair
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default Profile;
