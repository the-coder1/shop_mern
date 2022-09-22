import { Container, Flex, Text } from "@chakra-ui/react";
import useSWR from "swr";
import Layout from "../layout/Layout";
import Load from "../components/Load"
import { useEffect, useState } from "react";
import FilterProducts from "../components/product/FilterProducts";
import Card from "../components/product/Card"

function Content() {
  const { data, error } = useSWR("/api/products")
  const [products, setProducts] = useState()

  useEffect(() => {
    if (data) {
      setProducts(data)
    }
  }, [data])

  if (!data) {
    return <Load />
  }

  if (!data.length) {
    return <Text>No products added</Text>
  }

  if (products) {
    return (
      <Container>
        <Flex
          direction="column"
        >
          <FilterProducts
            data={data}
            products={products}
            setProducts={setProducts}
          />

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
              <Text>No products...</Text>
            )}
          </Flex>
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
