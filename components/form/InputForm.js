import { Box, Button, FormControl, FormErrorMessage, Icon, Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/react"
import { ErrorMessage, Field } from "formik"
import { useState } from "react"
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs"

export default function InputForm ({ children, name, type, placeholder, as, size, icon, error, ...props }) {
  const [show, setShow] = useState(false)

  return (
    <FormControl 
      isInvalid={error} 
      my={2}
      w={["90%", "85%", "80%", "75%", "70%"]}
      {...props}
    >
      <Box display="flex">
        <InputGroup>
          <InputLeftElement>
            <Icon as={icon} w={6} h={6} ml={1} color={error ? "red.500" : "purple.500"} />
          </InputLeftElement>
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
            boxShadow="md"
            borderRadius="xl"
            size={size}
            
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
        {msg => <FormErrorMessage ml={2}>{msg}</FormErrorMessage>}
      </ErrorMessage>
    </FormControl>
  )
}