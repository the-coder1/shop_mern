import { Box, Container, Flex, Heading, useColorModeValue } from "@chakra-ui/react";
import useSWR, { useSWRConfig } from "swr";
import Layout from "../layout/Layout";
import Load from "../components/Load"
import Card from "../components/product/Card"
import { useUser } from "../utils/user";
import { fetcher } from "../utils/api"

function Content() {
  const { user, loading } = useUser()
  const { data: products } = useSWR('/api/products')
  const { mutate } = useSWRConfig()
  const background = useColorModeValue("blackAlpha.50", "whiteAlpha.50")

  if (loading) {
    return (
      <Load />
    )
  }

  if (user) {
    return (
      <Container>
        <Box 
          bg={background} 
          mx="auto"
          my={10}
          w={200}
          p={5} 
          borderRadius="xl" 
          boxShadow="md"
        >
          <Heading
            as="h2" 
            size="md"
            color="purple.500"
            textAlign="center"
          >
            Your wishes
          </Heading>
        </Box>
        <Flex
          wrap="wrap"
          align="center"
          justify="center"
        >
        {user?.desires.map(item => {
          return (
            <Box key={item}>
              {products?.map(prod => {
                if (prod._id === item) {
                  return (
                    <Card
                      key={item}
                      value={prod}
                      width={200}
                      height={200}
                      remove={() => {
                        mutate(item && `/api/wish/${item}`, () =>
                          fetcher(item && `/api/wish/${item}`, {
                            method: 'DELETE'
                          })
                        )
                        mutate('/api/user', () => {
                          fetcher('/api/user')
                        })
                      }}
                    />
                  )
                }
              })}
            </Box>
          )
        })}
        </Flex>
      </Container>
    )
  }

  return null
}

export default function Wishlist() {
  return (
    <Layout title="Wish List">
      <Content />
    </Layout>
  )
}
