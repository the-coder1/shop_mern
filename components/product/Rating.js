import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs"
import { Flex, Icon, Text } from "@chakra-ui/react"

export default function Rating({ value, number, ...props }) {
  return (
    <Flex 
      align="center"
      mb={3}
      {...props}
    >
      <Icon 
        as={
          value >= 1
            ? BsStarFill
            : value >= 0.5
            ? BsStarHalf
            : BsStar
        } 
        color="yellow.400" 
        w={4} 
        h={4} 
        mr={1}
      />
      <Icon 
        as={
          value >= 2
            ? BsStarFill
            : value >= 1.5
            ? BsStarHalf
            : BsStar
        } 
        color="yellow.400" 
        w={4} 
        h={4}
        mr={1}
      />
      <Icon 
        as={
          value >= 3
            ? BsStarFill
            : value >= 2.5
            ? BsStarHalf
            : BsStar
        } 
        color="yellow.400" 
        w={4} 
        h={4} 
        mr={1}
      />
      <Icon 
        as={
          value >= 4
            ? BsStarFill
            : value >= 3.5
            ? BsStarHalf
            : BsStar
        } 
        color="yellow.400" 
        w={4} 
        h={4} 
        mr={1}
      />
      <Icon 
        as={
          value >= 5
            ? BsStarFill
            : value >= 4.5
            ? BsStarHalf
            : BsStar
        } 
        color="yellow.400" 
        w={4} 
        h={4} 
        mr={1}
      />
      {typeof number == 'number' && (
        <Text ml={1} as="sub" color="purple.500">{number} reviews</Text>
      )}
    </Flex>
  )
}