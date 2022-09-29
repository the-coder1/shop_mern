import { Icon, Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { BsSearch, BsX } from "react-icons/bs";

export default function SearchBox({ route, size, ...props }) {
  const router = useRouter()
  const [search, setSearch] = useState("" || router.query.search)

  const handleSearch = (e) => {
    e.preventDefault()
    router.push(`${route}?search=${search}`, undefined, { shallow: true })
  }

  return (
    <InputGroup
      my={5}
      w={["50%", "45%", "40%", "35%", "30%"]}
      as="form"
      onSubmit={handleSearch}
      size={size}
    >
      <InputLeftElement>
        <Icon as={BsSearch} w={4} h={4} ml={1} color="purple.500" />
      </InputLeftElement>
      <Input
        name="search"
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        focusBorderColor="none"
        pl={9}
        border="1px"
        borderColor="purple.500"
        boxShadow="md"
        borderRadius="xl"
        _hover={{
          borderColor: "purple.500"
        }}
        _invalid={{
          border: "1px",
          borderColor: "red.500"
        }}
        {...props}
      />
      <InputRightElement
        _hover={{
          cursor: "pointer"
        }}
        onClick={() => setSearch("")}
      >
        {search && <Icon as={BsX} w={6} h={6} mr={3} color="purple.500" />}
      </InputRightElement>
    </InputGroup>
  )
}