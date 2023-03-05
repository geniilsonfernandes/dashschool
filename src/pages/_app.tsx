import { AlertMessageProvider } from "@/contexts/AlertMessageContext";
import { SidebarDrawerProvider } from "@/contexts/SidebarDrawerContext";
import "@/styles/globals.css";
import theme from "@/styles/theme";
import { ChakraBaseProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {
  return (
    <ChakraBaseProvider resetCSS theme={theme}>
      <AlertMessageProvider>
        <SessionProvider session={session}>
          <SidebarDrawerProvider>
            <Component {...pageProps} />
          </SidebarDrawerProvider>
        </SessionProvider>
      </AlertMessageProvider>
    </ChakraBaseProvider>
  );
}
