import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Icon, Menu, MenuButton, MenuItem, MenuList, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack, SlideFade, Text, useDisclosure, useMediaQuery } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { BsArrowClockwise, BsArrowDownUp, BsCurrencyDollar, BsFilter, BsFunnel, BsSortAlphaDown, BsSortAlphaUp, BsSortDownAlt, BsSortUpAlt } from "react-icons/bs"

function SortProducts({ products, setProducts }) {
  function sortAsc() {
    const result = [...products].sort((a, b) => {
      const aLetter = a.name.toLowerCase()
      const bLetter = b.name.toLowerCase()

      if (aLetter < bLetter) return -1
      if (aLetter > bLetter) return 1
      return 0 
    })
    setProducts(result)
  }

  function sortDesc() {
    const result = [...products].sort((a, b) => {
      const aLetter = a.name.toLowerCase()
      const bLetter = b.name.toLowerCase()

      if (aLetter > bLetter) return -1
      if (aLetter < bLetter) return 1
      return 0 
    })
    setProducts(result)
  }

  function sortLow() {
    const result = [...products].sort((a, b) => a.price - b.price)
    setProducts(result)
  }

  function sortHigh() {
    const result = [...products].sort((a, b) => b.price - a.price)
    setProducts(result)
  }

  return (
    <Menu>
      <SlideFade in={products} offsetY={-50}>
        <MenuButton m={1} as={Button} leftIcon={<BsArrowDownUp />}>
          Sort
        </MenuButton>
      </SlideFade>
      <MenuList color="purple.500" py={!products?.length > 0 && 3} px={!products?.length > 0 && 5}>
        {products.length > 0 ? (
          <>
            <MenuItem 
              onClick={() => sortAsc()}
            >
              <Icon as={BsSortAlphaDown} w={5} h={5} mr={2} />The ascending order
            </MenuItem>
            <MenuItem 
              onClick={() => sortDesc()}
            >
              <Icon as={BsSortAlphaUp} w={5} h={5} mr={2} />The descending order</MenuItem>
            <MenuItem 
              onClick={() => sortLow()}
            >
              <Icon as={BsSortDownAlt} w={5} h={5} mr={2} />The lowest price</MenuItem>
            <MenuItem 
              onClick={() => sortHigh()}
            >
              <Icon as={BsSortUpAlt} w={5} h={5} mr={2} />The highest price</MenuItem>
          </>
        ) : (
          <Text>No products to sort...</Text>
        )}
      </MenuList>
    </Menu>
  )
}

function PriceProducts({ data, products, setProducts, minPrice, setMinPrice, maxPrice, setMaxPrice }) {
  function filterPrice(price) {
    const result = data.filter((item) => {
      return item.price >= price[0] && item.price <= price[1]
    })

    setProducts(result.filter(value => {
      return products.indexOf(value) >= -1
    }))
  }

  return (
    <Menu>
      <SlideFade in={products} offsetY={-50}>
        <MenuButton m={1} as={Button} leftIcon={<BsCurrencyDollar />}>
          Price
        </MenuButton>
      </SlideFade>
      <MenuList color="purple.500" py={3} px={5}>
        {minPrice !== maxPrice ? (
          <>
            <Flex justify="space-between" mb={1}>
              <Text ml={-2}>{minPrice} RON</Text>
              <Text mr={-2}>{maxPrice} RON</Text>
            </Flex>
            <RangeSlider
              value={[minPrice, maxPrice]}
              min={0}
              max={data?.length > 0 && data.reduce((a, b) => a.price > b.price ? a : b).price}
              onChange={(val) => {
                filterPrice(val)
                setMinPrice(val[0])
                setMaxPrice(val[1])
              }}
              colorScheme="purple"
            >
              <RangeSliderTrack>
                <RangeSliderFilledTrack />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
              <RangeSliderThumb index={1} />
            </RangeSlider>
          </>
        ) : (
          <Text ml={3}>No prices...</Text>
        )}
      </MenuList>
    </Menu>
  )
}

function FormatProducts({ data, products, setProducts, setMaxPrice }) {
  const formats = data?.map(prod => prod.format)
                      .map((elem, index, final) => final.indexOf(elem) === index && index)
                      .filter(elem => data[elem])
                      .map(elem => data[elem].format)

  function filterFormat(product) {
    const result = data.filter((item) => {
      return item.format === product
    })

    const filter = result.filter(value => {
      return products.indexOf(value) >= -1
    })

    setProducts(filter)

    setMaxPrice(filter.reduce((a, b) => a.price > b.price ? a : b).price)
  }

  return (
    <Menu>
      <SlideFade in={products} offsetY={-50}>
        <MenuButton m={1} as={Button} leftIcon={<BsFunnel />}>
          Format
        </MenuButton>
      </SlideFade>
      <MenuList color="purple.500" py={!formats?.length > 0 && 3} px={!formats?.length > 0 && 5}>
        {formats?.length > 0 ? (
          formats?.map((value, index) => (
            <MenuItem
              key={index}
              onClick={() => filterFormat(value)}
            >{value} ml</MenuItem>
          ))
        ) : (
          <Text ml={3}>No formats...</Text>
        )}
      </MenuList>
    </Menu>
  )
}

export default function FilterProducts({ data, products, setProducts }) {
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(products.length !== 0 && products.reduce((a, b) => a.price > b.price ? a : b).price)
  const [isLargerThan48em] = useMediaQuery("(min-width: 48em)")
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    setMaxPrice(data?.length ? data.reduce((a, b) => a.price > b.price ? a : b).price : 0)
  }, [data])

  function resetValues() {
    setProducts(data)
    setMinPrice(0)
    setMaxPrice(data.length !== 0 && data.reduce((a, b) => a.price > b.price ? a : b).price)
  }

  return (
    <Flex 
      direction={["column", "row"]}
      align={["start", "center"]}
    >
      {!isLargerThan48em ? (
        <>
          <Button 
            onClick={() => onOpen()}
          >
            <Icon as={BsFilter} w={5} h={5} mr={2} />Filter
          </Button>
          <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton color="purple.500" size="lg" />
              <DrawerHeader />
              <DrawerBody>
                <SortProducts
                  products={products}
                  setProducts={setProducts}
                />
                <PriceProducts
                  data={data}
                  products={products}
                  setProducts={setProducts}
                  minPrice={minPrice}
                  setMinPrice={setMinPrice}
                  maxPrice={maxPrice}
                  setMaxPrice={setMaxPrice}
                />
                <FormatProducts
                  data={data}
                  products={products}
                  setProducts={setProducts}
                  setMinPrice={setMinPrice}
                  setMaxPrice={setMaxPrice}
                />
                <SlideFade in={products} offsetY={-50}>
                  <Button leftIcon={<BsArrowClockwise />} p={5} my={1} ml={0} onClick={() => resetValues()}>Reset</Button>
                </SlideFade>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </>
      ) : (
        <>
          <SortProducts
            products={products}
            setProducts={setProducts}
          />
          <PriceProducts
            data={data}
            products={products}
            setProducts={setProducts}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
          />
          <FormatProducts
            data={data}
            products={products}
            setProducts={setProducts}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
          />
          <SlideFade in={products} offsetY={-50}>
            <Button leftIcon={<BsArrowClockwise />} p={5} my={1} ml={1} onClick={() => resetValues()}>Reset</Button>
          </SlideFade>
        </>
      )}
    </Flex>
  )
}