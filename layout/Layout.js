import Head from "next/head";
import { Grid, VStack, Box, Container, Flex, Button, useColorMode, useColorModeValue, Icon, Text, useMediaQuery, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody } from "@chakra-ui/react";
import Link from "next/link";
import { BsHeart, BsList, BsMoon, BsPerson, BsSun } from "react-icons/bs"

const MenuItem = ({ href, children }) => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Link 
      href={href} 
      passHref 
    >
      <Button
        // color="gray.300"
        _hover={{
          bg: colorMode === "light" ? "blackAlpha.300" : "whiteAlpha.300"
        }}
        _active={{
          bg: "none"
        }}
      >
        <Text
          bgGradient="linear(to-r, pink, purple)"
          bgClip="text"
          fontSize="2xl"
          fontWeight="bold"
        >
          {children}
        </Text>
      </Button>
    </Link>
  )
}

function Account({ smallDevice }) {
  return (
    <Link href='/account' passHref>
      <Button mr={[0, 3]} my={!smallDevice ? 1 : 0}>
        <Icon as={BsPerson} w={6} h={6} mr={!smallDevice ? 2 : 0} /> {!smallDevice ? "Account" : ""}
      </Button>
    </Link>
  )
}

function WishList({ smallDevice }) {
  return (
    <Link href='/wishlist' passHref>
      <Button mr={[0, 3]} my={!smallDevice ? 1 : 0}>
        <Icon as={BsHeart} w={5} h={5} mr={!smallDevice ? 2 : 0} /> {!smallDevice ? "Wish List" : ""}
      </Button>
    </Link>
  )
}

function Theme({ smallDevice }) {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Button
      onClick={toggleColorMode}
      my={!smallDevice ? 1 : 0}
    >
      <Icon
        as={colorMode === "light" ? BsSun : BsMoon}
        w={6}
        h={6}
        mr={!smallDevice ? 2 : 0}
      /> {!smallDevice ? colorMode === "light" ? "Light" : "Dark" : ""}
    </Button>
  )
}

function Hamburger() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button onClick={onOpen}>
        <Icon as={BsList} w={6} h={6} />
      </Button>
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton color="purple.500" size="lg" />
          <DrawerHeader />
          <DrawerBody>
            <Flex direction="column" align="start">
              <Account />
              <WishList />
              <Theme />
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

function Header() {
  const background = useColorModeValue("blackAlpha.50", "whiteAlpha.50")

  const [extraSmallDevice] = useMediaQuery("(max-width: 30em)")
  const [smallDevice] = useMediaQuery("(min-width: 30em)")
  const [mediumDevice] = useMediaQuery("(min-width: 48em)")
  const [largeDevice] = useMediaQuery("(min-width: 62em)")
  const [extraLargeDevice] = useMediaQuery("(min-width: 80em)")

  return (
    <Box
      bg={background}
      boxShadow="md"
    >
      <Container>
        <Flex
          direction={["column", , , , "row"]}
          as="nav"
          py="2"
        >
          <Flex
            align="center"
            justify="space-between"
            pos="relative"
            w="100%"
          >
            <MenuItem href="/">Shop</MenuItem>
            <Flex justify="end">
              {smallDevice ? (
                <>
                  <WishList smallDevice={smallDevice} />
                  <Account smallDevice={smallDevice} />
                  <Theme smallDevice={smallDevice} />
                </>
              ) : (
                <Hamburger />
              )}
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}

export default function Layout({ title, children }) {
  const theme = useColorModeValue("purple.400", "purple.800")

  return (
    <>
      <Head>
        {title && <title>{title}</title>}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid minH="100vh">
        <VStack w="full" align="stretch" spacing={8}>
          <Header theme={theme} />
          <Box as="main" h="full">
            {children}
          </Box>
        </VStack>
      </Grid>
    </>
  )
}