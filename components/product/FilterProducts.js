import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Icon, Menu, MenuButton, MenuItem, MenuList, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack, SlideFade, Text, useDisclosure, useMediaQuery } from "@chakra-ui/react"
import { useState } from "react"
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
      <MenuList color="purple.500">
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
      </MenuList>
    </Menu>
  )
}

function PriceProducts({ data, products, setProducts, maxPrice, setMaxPrice }) {
  const [minPrice, setMinPrice] = useState(0)

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
        <Flex justify="space-between">
          <Text>{minPrice} RON</Text>
          <Text>{maxPrice} RON</Text>
        </Flex>
        <RangeSlider
          value={[0, maxPrice]}
          min={0}
          max={data.reduce((a, b) => a.price > b.price ? a : b).price}
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
      </MenuList>
    </Menu>
  )
}

function FormatProducts({ data, products, setProducts, maxPrice, setMaxPrice }) {
  const formats = products.map(prod => prod.format)
                      .map((elem, index, final) => final.indexOf(elem) === index && index)
                      .filter(elem => products[elem])
                      .map(elem => products[elem].format)

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
      <MenuList color="purple.500">
        {formats.map((value, index) => (
          <MenuItem
            key={index}
            onClick={() => filterFormat(value)}
          >{value} ml</MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default function FilterProducts({ data, products, setProducts }) {
  const [maxPrice, setMaxPrice] = useState(products.length !== 0 && products.reduce((a, b) => a.price > b.price ? a : b).price)
  const [isLargerThan30em] = useMediaQuery("(min-width: 30em)")
  const { isOpen, onOpen, onClose } = useDisclosure()

  function resetValues() {
    setProducts(data)
  }

  return (
    <Flex 
      direction={["column", "row"]}
      align={["start", "center"]}
    >
      {!isLargerThan30em ? (
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
                  maxPrice={maxPrice}
                  setMaxPrice={setMaxPrice}
                />
                <FormatProducts
                  data={data}
                  products={products}
                  setProducts={setProducts}
                  maxPrice={maxPrice}
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
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
          />
          <FormatProducts
            data={data}
            products={products}
            setProducts={setProducts}
            maxPrice={maxPrice}
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