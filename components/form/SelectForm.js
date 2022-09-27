import { Box, FormControl, FormErrorMessage, Select} from "@chakra-ui/react"
import { Field, ErrorMessage } from "formik"

export default function SelectForm({ name, error, children, value }) {
  return (
    <FormControl 
      isInvalid={error} 
      my={2}  
      w={["90%", "85%", "80%", "75%", "70%"]}
    >
      <Box display="flex">
        <Field 
          as={Select} 
          name={name} 
          focusBorderColor="none"
          border="1px"
          borderColor="purple.500"
          borderRadius="xl"
          size="sm"
          _hover={{
            borderColor: "purple.500"
          }}
          _invalid={{
            border: "1px",
            borderColor: "red.500"
          }}
        >
          <option value="" disabled={value !== 0 && true}>Select a {name}</option>
          <option value="1">1 - Poor</option>
          <option value="2">2 - Fair</option>
          <option value="3">3 - Good</option>
          <option value="4">4 - Very Good</option>
          <option value="5">5 - Excellent</option>
        </Field>
        {children}
      </Box>
      <ErrorMessage name={name}>
        {msg => <FormErrorMessage ml={2}>{msg}</FormErrorMessage>}
      </ErrorMessage>
    </FormControl>
  )
}