import { extendTheme } from "@chakra-ui/react"

const config = {
  initialColorMode: 'light',
}

const components = {
  Container: {
    baseStyle: {
      maxW: 'container.xl',
    },
  },
  Button: {
    baseStyle: {
      transition: "0.25s",
      borderRadius: "xl",
      _hover: {
        boxShadow: "lg",
        transform: "translateY(-5%)"
      },
      _active: {
        transform: "translateY(-5%)"
      },
    },
    defaultProps: {
      variant: "ghost",
      colorScheme: "purple",
    }
  },
  Input: {
    baseStyle: {
      field: {
        _focus: {
          boxShadow: "lg"
        },
      },
    }
  }
}

const theme = extendTheme({ config, components })

export default theme