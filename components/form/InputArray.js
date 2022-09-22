import { FieldArray } from "formik"
import { Box, Button } from "@chakra-ui/react"
import InputForm from "./InputForm"

export default function InputArray ({ values, name, type, placeholder, icon, error, align }) {
  return (
    <FieldArray
      name={name} 
    >
      {({ remove, push }) => (
        <Box
          w={["90%", "85%", "80%", "75%", "70%"]}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          {values && values.map((tag, index) => (
            <Box 
              key={index}
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
              w="100%"
            >
              <InputForm
                name={`${name}[${index}]`}
                type={type}
                placeholder={placeholder}
                icon={icon}
                error={error?.[index]}
                textAlign={align}
                children={
                  <Button
                    onClick={() => values.length > 1 && remove(index)}
                    border={error?.[index] ? "2px" : "1px"}
                    color={error?.[index] ? "red.500" : "gray.700"}
                    borderRadius="md"
                    ml={2}
                    boxShadow="sm"
                    bg="none"
                    transition="0.25s"
                    _hover={{
                      transform: "scale(1.05)",
                      bg: error?.[index] ? "red.200" : "gray.400",
                      boxShadow: "md"
                    }}
                  >
                    Delete
                  </Button>
                }
              />
            </Box>
          ))}
          <Button
            onClick={() => !error && push()}
            border={error ? "2px" : "1px"}
            color={error ? "red.500" : "gray.700"}
            borderRadius="md"
            ml={2}
            boxShadow="sm"
            bg="none"
            transition="0.25s"
            _hover={{
              transform: "scale(1.05)",
              bg: error ? "red.200" : "gray.400",
              boxShadow: "md"
            }}
          >
            Create
          </Button>
        </Box>
      )}
    </FieldArray>
  )
}