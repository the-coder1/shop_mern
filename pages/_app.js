import { ChakraProvider } from "@chakra-ui/react"
import theme from "../utils/theme"
import { swrOptions } from "../utils/api"
import { SWRConfig } from "swr"

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <SWRConfig value={swrOptions}>
        <Component {...pageProps} />
      </SWRConfig>
    </ChakraProvider>
  )
}

export default MyApp
