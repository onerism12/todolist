import Link from "next/link";
import Layout from "../components/Layout";
import DashboardActivity from "./dashboardactivity";
import { ChakraProvider } from "@chakra-ui/react";

const IndexPage = () => (
  <ChakraProvider>
    <Layout title="TO DO LIST APP">
      <DashboardActivity />
    </Layout>
  </ChakraProvider>
);

export default IndexPage;
