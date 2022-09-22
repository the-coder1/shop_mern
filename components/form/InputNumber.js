import { FormControl, InputGroup, InputLeftElement, Icon, Input, FormErrorMessage, Box } from "@chakra-ui/react"
import { ErrorMessage, Field } from "formik"

export default function InputNumber ({ label, name, error, icon, children, ...props }) {
  return (
    <FormControl 
      isInvalid={error} 
      my={3}  
      w={["50%", "45%", "40%", "35%", "30%"]}
      {...props}
    >
      <Box display="flex">
        <InputGroup>
          <InputLeftElement
            children={
              <Icon as={icon} w={6} h={6} ml={1} color={error ? "red.500" : "gary.700"} />
            }
          />
          <Field
            name={name}
            type="text"
            as={Input}
            color="gray.700"
            textAlign="center"
            boxShadow="sm"
            focusBorderColor="none"
            border="1px"
            borderColor="gray.700"
            borderRadius="md"
            _hover={{
              borderColor: "gray.700",
              boxShadow: "md",
            }}
            _focus={{
              boxShadow: "md"
            }}
            _invalid={{
              border: "2px",
              borderColor: "red.500"
            }}
          />
        </InputGroup>
        {children}
      </Box>
      <ErrorMessage name={name}>
        {msg => <FormErrorMessage>{msg}</FormErrorMessage>}
      </ErrorMessage>
    </FormControl>
  )
}