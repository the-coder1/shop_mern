import { Box } from "@chakra-ui/react";
import Image from "next/image";

export default function BoxImage({ width, height, ...props }) {
  return (
    <Box
      minW={width}
      h={height}
      pb={5}
      borderRadius="xl"
      overflow="hidden"
      {...props}
    >
      <Image
        src="/post_model.jpg"
        alt="Product model"
        layout="responsive"
        width={width}
        height={height}
      />
    </Box>
  )
}