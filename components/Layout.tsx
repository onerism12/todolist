import React, { ReactNode } from "react";
import Head from "next/head";
import { Box, Container } from "@chakra-ui/react";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "To Do List App" }: Props) => (
  <Box>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Box bg="#16ABF8" h="105px">
      <Container
        maxW="5xl"
        color="white"
        fontSize="2xl"
        fontWeight="bold"
        h="full"
        display="flex"
        alignItems="center"
        bg="#16ABF8"
      >
        TO DO LIST APP
      </Container>
    </Box>
    <Container maxW="5xl">{children}</Container>
  </Box>
);

export default Layout;
