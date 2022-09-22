import { Center, Spinner, useColorModeValue } from "@chakra-ui/react"

export default function Load() {
  const theme = useColorModeValue("purple.300", "purple.700")

  return (
    <Center h="90%">
      <Spinner 
        color={theme}
        size='xl' 
        thickness='3px' 
        emptyColor='gray.200' 
        speed='0.5s' 
      />
    </Center>
  )
}