import { FormControl, InputGroup, InputLeftElement, Icon, Input, FormErrorMessage, useNumberInput, Button, Flex } from "@chakra-ui/react"
import { ErrorMessage, Field } from "formik"
import { BsDash, BsPlus } from "react-icons/bs"

export default function InputNumber ({ children, label, name, error, icon, value, stock, ...props }) {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: value,
      min: 1,
      max: stock,
      precision: 0,
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
      <Flex justify="center">
        <Button {...dec} mr={3}>
          <Icon as={BsDash} w={6} h={6} />
        </Button>
        <InputGroup>
          <InputLeftElement>
            <Icon as={icon} w={6} h={6} ml={1} color={error ? "red.500" : "purple.500"} />
          </InputLeftElement>
          <Field
            name={name}
            type="number"
            isReadOnly
            textAlign="center"
            as={Input}
            color={error && "red.500"}
            focusBorderColor="none"
            pl={7}
            border="1px"
            borderColor="purple.500"
            boxShadow="md"
            borderRadius="xl"
            _hover={{
              borderColor: "purple.500"
            }}
            _invalid={{
              border: "1px",
              borderColor: "red.500"
            }}
            w="300px"
            {...input}
          />
        </InputGroup>
        <Button {...inc} ml={3}>
          <Icon as={BsPlus} w={6} h={6} />
        </Button>
      </Flex>
      <ErrorMessage name={name}>
        {msg => <FormErrorMessage>{msg}</FormErrorMessage>}
      </ErrorMessage>
    </FormControl>
  )
}