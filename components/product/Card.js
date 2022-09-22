import { Box, Button, Flex, Icon, SlideFade, Text, useColorModeValue, useMediaQuery } from "@chakra-ui/react";
import Link from "next/link";
import { BsBagPlus, BsTrash } from "react-icons/bs";
import BoxImage from "../BoxImage"
import Rating from "./Rating";

export default function Card({ value, width, height, dir, remove, addToCart }) {
  const background = useColorModeValue("blackAlpha.50", "whiteAlpha.50")
  const [smallDevice] = useMediaQuery("(min-width: 30em)")

  return (
    <SlideFade in={value._id} offsetY={50}>
      <Flex
        bg={background}
        boxShadow="md"
        borderRadius="xl"
        direction={dir ? dir : ["column", "row"]}
        align="center"
        mx={[1, 3, 5]}
        my={dir ? 5 : 2}
        p={2}
        transition="0.25s"
        _hover={{
          cursor: "pointer",
          transform: "translateY(-1%)",
          boxShadow: "lg",
        }}
        _pressed={{
          cursor: "pointer",
          transform: "translateY(-1%)",
          boxShadow: "lg",
        }}
      >
        <Link href={`/product/${value._id}`} passHref>
          <Flex
            direction={dir ? dir : ["column", "row"]}
            align="center"
          >
            <BoxImage
              width={dir ? width : width / (smallDevice ? 3 : 2)}
              height={dir ? height : height / (smallDevice ? 3 : 2)}
              boxShadow="sm"
            />
            <Box ml={dir ? 0 : [0, 5]} mt={2} px={2} w={200} color="purple.500">
              <Flex 
                direction={dir ? "row" : ["row", "row"]}
                justify="space-between" 
                align="center"
                mt={!dir && [2, 0]}
              >
                <Text mb={3} w={["100%", "60%"]}>{value.name.split(' ').slice(1, 4).join(' ')}...</Text>
                <Text mb={3} wordBreak={false}>{value.price} RON</Text>
              </Flex>
              {dir && (
                <Rating
                  value={value.rating}
                  number={value.reviews.length}
                />
              )}
            </Box>
          </Flex>
        </Link>
        {!dir && (
          <Flex 
            direction={["row", "column"]} 
            justify="space-around" 
            w={["100%"]}
            mt={[2, 0]}
          >
            <Button size="sm" m={1} onClick={remove}>
              <Icon as={BsTrash} w={5} h={5} />
            </Button>
            <Button size="sm" m={1} onClick={addToCart}>
              <Icon as={BsBagPlus} w={5} h={5} />
            </Button>
          </Flex>
        )}
      </Flex>
    </SlideFade>
  )
}