import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default function App({ Component, pageProps }: AppProps) {
  const theme = createTheme({
    fontFamily: "Open Sans, Sans-Serif",
    primaryColor: "cyan",
  });
  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <Header></Header>
      <Component {...pageProps} />
      <Footer></Footer>
    </MantineProvider>
  );
}
