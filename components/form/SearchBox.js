import { Icon, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";

export default function SearchBox({ route, ...props }) {
  const router = useRouter()
  const [search, setSearch] = useState("")

  const handleSearch = (e) => {
    e.preventDefault()
    router.push(`${route}?search=${search}`, undefined, { shallow: true })
  }

  return (
    <InputGroup
      my={5}
      mx="auto"
      w={["90%", "85%", "80%", "75%", "70%"]}
      as="form"
      onSubmit={handleSearch}
    >
      <InputLeftElement>
        <Icon as={icon} w={6} h={6} ml={1} color={error ? "red.500" : "purple.500"} />
      </InputLeftElement>
      <Input
        name="search"
        type="search"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        color={"gray.700"}
        boxShadow="sm"
        focusBorderColor="none"
        border="1px"
        borderColor="gray.700"
        borderRadius="md"
        pl={10}
        _hover={{
          borderColor: "gray.700",
          boxShadow: "md",
        }}
        _focus={{
          boxShadow: "md"
        }}
        _invalid={{
          border: "2px",
          borderColor: "red.500"
        }}
        {...props}
      />
    </InputGroup>
  )
}