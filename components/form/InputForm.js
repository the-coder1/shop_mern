import { Box, Button, FormControl, FormErrorMessage, Icon, Input, InputGroup, InputLeftElement, InputRightElement, useColorModeValue } from "@chakra-ui/react"
import { ErrorMessage, Field } from "formik"
import { useState } from "react"
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs"

export default function InputForm ({ name, type, placeholder, as, size, icon, error, children, ...props }) {
  const [show, setShow] = useState(false)
  const theme = useColorModeValue("purple.400", "purple.600")

  return (
    <FormControl 
      isInvalid={error} 
      my={3}
      w={["90%", "85%", "80%", "75%", "70%"]}
      {...props}
    >
      <Box display="flex">
        <InputGroup>
          <InputLeftElement
            children={
              <Icon as={icon} w={6} h={6} ml={1} color={error ? "red.500" : "purple.500"} />
            }
          />
          <Field
            name={name}
            type={show ? 'text' : type}
            as={as ? as : Input}
            placeholder={placeholder}
            color={error && "red.500"}
            focusBorderColor="none"
            pl={10}
            border="1px"
            borderColor="purple.500"
            borderRadius="xl"
            _hover={{
              borderColor: "purple.500"
            }}
            _invalid={{
              border: "1px",
              borderColor: "red.500"
            }}
          />
          {type === "password" && (
            <InputRightElement mr={3}>
              <Button 
                onClick={() => setShow(!show)}
                color={error ? "red.500" : "purple.500"}
                size="xs"
              >
                {show ? <Icon as={BsFillEyeSlashFill} w={5} h={5} /> : <Icon as={BsFillEyeFill} w={5} h={5} />}
              </Button>
            </InputRightElement>
          )}
        </InputGroup>
        {children}
      </Box>
      <ErrorMessage name={name}>
        {msg => <FormErrorMessage>{msg}</FormErrorMessage>}
      </ErrorMessage>
    </FormControl>
  )
}