import { Flex, useColorModeValue } from "@chakra-ui/react";
import { Form } from "formik";

export default function FormContainer ({ children, ...props }) {
  const background = useColorModeValue("blackAlpha.50", "whiteAlpha.50")

  return (
    <Form>
      <Flex
        direction="column"
        align="center"
        boxShadow="lg"
        borderRadius="2xl"
        bg={background}
        py={6}
        px={3}
        w={["90%", "75%", "60%", "45%", "30%"]}
        mx="auto"
        my={10}
        {...props}
      >
        {children}
      </Flex>
    </Form>
  )
}