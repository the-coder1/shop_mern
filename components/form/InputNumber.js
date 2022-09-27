import { FormControl, InputGroup, InputLeftElement, Icon, Input, FormErrorMessage, Box, useNumberInput, Button } from "@chakra-ui/react"
import { ErrorMessage, Field } from "formik"

export default function InputNumber ({ children, label, name, error, icon, ...props }) {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 0.01,
      defaultValue: 1.53,
      min: 1,
      max: 6,
      precision: 2,
    })

  const inc = getIncrementButtonProps()
  const dec = getDecrementButtonProps()
  const input = getInputProps()

  return (
    <FormControl 
      isInvalid={error} 
      my={3}  
      w={["50%", "45%", "40%", "35%", "30%"]}
      {...props}
    >
      <Box display="flex">
        <Button {...dec}>-</Button>
        <InputGroup>
          <InputLeftElement>
            <Icon as={icon} w={6} h={6} ml={1} color={error ? "red.500" : "purple.500"} />
          </InputLeftElement>
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
            {...input}
          />
        </InputGroup>
        <Button {...inc}>+</Button>
      </Box>
      <ErrorMessage name={name}>
        {msg => <FormErrorMessage>{msg}</FormErrorMessage>}
      </ErrorMessage>
    </FormControl>
  )
}