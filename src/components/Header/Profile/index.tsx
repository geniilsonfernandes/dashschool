import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

type ProfileProps = {
  showProfileData?: boolean;
};

const Profile = ({ showProfileData = true }: ProfileProps) => {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box marginRight="4" textAlign="right">
          <Text>genilson</Text>
          <Text color="gray.300" fontSize="small">
            ddfdfdfd
          </Text>
        </Box>
      )}

      <Avatar size="md" name="ds" src="" />
    </Flex>
  );
};

export default Profile;
