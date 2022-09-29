import { Alert, AlertIcon, Container, Flex, SlideFade, Text } from "@chakra-ui/react";
import useSWR from "swr";
import Layout from "../layout/Layout";
import Load from "../components/Load"
import { useEffect, useState } from "react";
import FilterProducts from "../components/product/FilterProducts";
import Card from "../components/product/Card"
import { useRouter } from "next/router";
import SearchBox from "../components/SearchBox";

function Content() {
  const router = useRouter()
  const { search } = router.query
  const { data, error } = useSWR(search ? `/api/products?search=${search}` : "/api/products")
  const [products, setProducts] = useState()

  useEffect(() => {
    if (data) {
      setProducts(data)
    }
  }, [data])

  if (products) {
    return (
      <Container>
        <Flex
          direction="column"
        >
          <Flex
            justify="space-around"
            align="center"
          >
            <FilterProducts
              data={data}
              products={products}
              setProducts={setProducts}
            />
            <SearchBox
              route="/"
              size="sm"
            />
          </Flex>

          {!data ? (
            <Load />
          ) : (
            <Flex 
              direction="row" 
              wrap="wrap"
              align="center"
              justify="center"
              my={5}
            >
              {products.length !== 0 ? (
                products.map((product, index) => (
                  <Card
                    key={index}
                    value={product}
                    width={200}
                    height={200}
                    dir="column"
                  />
                ))
              ) : (
                <SlideFade in={products} offsetY={-50}>
                  <Alert status='info' borderRadius="xl" boxShadow="md" mx="auto">
                    <AlertIcon />
                    <Text>No products found...</Text>
                  </Alert>
                </SlideFade>
              )}
            </Flex>
          )}
        </Flex>
      </Container>
    )
  }

  return null
}

export default function Home() {
  return (
    <Layout title="Shop">
      <Content />
    </Layout>
  )
}
