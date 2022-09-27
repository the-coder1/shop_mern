import useSWR, { useSWRConfig } from "swr";
import Layout from "../../layout/Layout";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Container, Flex, Heading, Icon, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SlideFade, Text, Textarea, Tooltip, useColorModeValue, useDisclosure, useMediaQuery } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Form, Formik } from "formik";
import * as yup from "yup"
import { BsCartPlus, BsCheck2All, BsCollection, BsFillChatTextFill, BsFillForwardFill, BsFillHeartFill, BsHash, BsHeart, BsLock, BsPatchExclamationFill, BsPersonFill } from "react-icons/bs";
import { fetcher } from "../../utils/api";
import { useUser } from "../../utils/user"
import { useState } from "react";
import BoxImage from "../../components/BoxImage"
import Rating from '../../components/product/Rating'
import Load from "../../components/Load"
import FormContainer from "../../components/form/FormContainer";
import SelectForm from "../../components/form/SelectForm";
import InputForm from "../../components/form/InputForm";
import InputNumber from "../../components/form/InputNumber"

const commentSchema = yup.object().shape({
  rating: yup.number().required("Please select a rating!").min(1, "Please select the rating!"),
  comment: yup.string().required("Please write a comment!")
})

function Content({ id, data }) {
  const background = useColorModeValue("blackAlpha.50", "whiteAlpha.50")
  const color = useColorModeValue("blackAlpha.700", "whiteAlpha.700")
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { user } = useUser()
  const { data: wish } = useSWR(id && `/api/wish/${id}`)
  const { mutate } = useSWRConfig()
  const [postComment, setPostComment] = useState(false)
  const [show, setShow] = useState(false)
  const [showID, setShowID] = useState(false)


  const [smallDevice] = useMediaQuery("(min-width: 30em)")

  const createComment = (values) => {
    mutate(id && `/api/review/${id}`, () => 
      fetcher(id && `/api/review/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          rating: values.rating,
          comment: values.comment,
          user: user
        })
      })
    )
    mutate(id && `/api/product/${id}`, () => {
      fetcher(id && `/api/product/${id}`)
    })
  }

  if (!data) return <Load />

  if (data) {
    return (
      <Container>
        <Flex direction="column">
          <SlideFade in={user} offsetY={-50}>
            <Flex
              direction={["column", , , "row"]}
              align={["center", , , "start"]}
              justify="space-around"
              my={50}
              py={5}
              px={[1, 3, 5]}
              bg={background}
              boxShadow="lg"
              borderRadius="2xl"
            >
              <Flex
                direction="column"
                align="center"
                mb={3}
              >
                <BoxImage
                  width={smallDevice ? 300 : 200}
                  height={smallDevice ? 300 : 200}
                  my={3}
                  boxShadow="md"
                />
                <Flex 
                  w="100%"
                  justify="space-evenly"
                >
                  <>
                    <Tooltip 
                      hasArrow 
                      label={user?.auth ? "You must have an account!" : data?.stock === 0 ? "Sold out!" : "Add to cart list!"} 
                      shouldWrapChildren 
                      borderRadius="xl"
                      boxShadow="md"
                      p={2}
                    >
                      <Button 
                        variant="outline"
                        mr={2}
                        onClick={onOpen}
                        isDisabled={user?.auth ? true : data?.stock === 0 ? true : false}
                        flex={1}
                        w={[75, , 100, 125]}
                      >
                        <Icon as={BsCartPlus} w={5} h={5} />
                      </Button>
                    </Tooltip>
                    <Modal 
                      isOpen={isOpen} 
                      onClose={onClose} 
                      isCentered
                      scrollBehavior="inside"
                      size="xs"
                      motionPreset="slideInBottom"
                    >
                      <ModalOverlay backdropFilter="auto" backdropBlur="2px" />
                      <ModalContent color="purple.500">
                        <ModalHeader>Select the quantity</ModalHeader>
                        <ModalCloseButton size="lg" />
                        <Formik
                          initialValues={{
                            quantity: 0
                          }}
                          onSubmit={(values) => addToCart(values)}
                        >
                          {({ errors, touched }) => (
                            <Form>
                              <ModalBody>
                                {user?.message && (<Text color="red.500">{user.message}</Text>)}
                                <InputNumber
                                  label="Quantity"
                                  name="quantity"
                                  error={errors.quantity && touched.quantity ? errors.quantity : null}
                                  icon={BsCollection}
                                />
                              </ModalBody>
                              <ModalFooter>
                                <Button colorScheme='gray' color="black" mr={3} onClick={onClose}>
                                  Close
                                </Button>
                                <Button type="submit">Add to cart</Button>
                              </ModalFooter>
                            </Form>
                          )}
                        </Formik>
                      </ModalContent>
                    </Modal>
                  </>
                  <Tooltip 
                    hasArrow 
                    label={user?.auth ? "You must have an account!" : "Add to wish list!"} 
                    shouldWrapChildren 
                    borderRadius="xl"
                    boxShadow="md"
                    p={2}
                  >
                    <Button 
                      variant="outline"
                      ml={2}
                      onClick={() => {
                        mutate(id && `/api/wish/${id}`, () =>
                          fetcher(id && `/api/wish/${id}`, {
                            method: wish?.found ? 'DELETE' : 'PUT',
                          })
                        );
                      }}
                      isDisabled={user?.auth ? true : false}
                      w={[75, , 100, 125]}
                    >
                      <Icon as={wish?.found ? BsFillHeartFill : BsHeart} w={5} h={5} />
                    </Button>
                  </Tooltip>
                </Flex>
              </Flex>
              
              <Flex 
                direction="column" 
                color="purple.500"
                my={3}
                w={["90%", "80%", "70%", "60%", "50%"]}
              >
                <Heading 
                  as="h2" 
                  size={smallDevice ? "md" : "sm"} 
                  mb={3}
                >
                  {data.name}
                </Heading>

                <Flex 
                  direction={["column", "row"]}
                  justify="space-between"
                  align={["end", "center"]}
                  mb={3}
                >
                  <Rating
                    value={data.rating}
                    number={data.reviews.length}
                  />

                  <Text 
                    fontSize={smallDevice ? "xl" : "lg"} 
                    fontWeight="500"
                    color={color}
                    mb={3}
                  >
                    {data.price} RON / {data.format} ml
                  </Text>
                </Flex>

                <Accordion defaultIndex={[0]} allowMultiple mb={3}>
                  <AccordionItem borderRadius="xl">
                    <AccordionButton 
                      boxShadow="sm"
                      borderRadius="xl"
                      _expanded={{ 
                        bg: 'purple.500', 
                        color: color, 
                        borderRadius: "xl",
                        boxShadow: "md"
                      }}
                      _hover={{
                        bg: "none"
                      }}
                      _active={{
                        bg: "none"
                      }}
                    >
                      <Text flex="1" textAlign="left">Description</Text>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel py={4}>
                      <Text>{data.description}</Text>
                    </AccordionPanel>
                  </AccordionItem>

                  <AccordionItem borderRadius="xl">
                    <AccordionButton
                      boxShadow="sm"
                      borderRadius="xl"
                      _expanded={{ 
                        bg: 'purple.500', 
                        color: color, 
                        borderRadius: "xl",
                        boxShadow: "md"
                      }}
                      _hover={{
                        bg: "none"
                      }}
                      _active={{
                        bg: "none"
                      }}
                    >
                      <Text flex="1" textAlign="left">Details</Text>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel py={4}>
                      {data.ideas.map((idea, index) => (
                        <Text key={index} mb={2}><Icon as={BsFillForwardFill} w={5} h={5} color="blue.500" mr={1} mb={-1} />{idea}</Text>
                      ))}
                    </AccordionPanel>
                  </AccordionItem>

                  <AccordionItem borderRadius="xl">
                    <AccordionButton
                      boxShadow="sm"
                      borderRadius="xl"
                      _expanded={{ 
                        bg: 'purple.500', 
                        color: color, 
                        borderRadius: "xl",
                        boxShadow: "md"
                      }}
                      _hover={{
                        bg: "none"
                      }}
                      _active={{
                        bg: "none"
                      }}
                    >
                      <Text flex="1" textAlign="left">Uses</Text>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel py={4}>
                      {data.uses.map((use, index) => (
                        <Text key={index} mb={2}><Icon as={BsPatchExclamationFill} w={5} h={5} color="yellow.500" mr={1} mb={-1} />{use}</Text>
                      ))}
                    </AccordionPanel>
                  </AccordionItem>

                  <AccordionItem borderRadius="xl">
                    <AccordionButton
                      boxShadow="sm"
                      borderRadius="xl"
                      _expanded={{ 
                        bg: 'purple.500', 
                        color: color, 
                        borderRadius: "xl",
                        boxShadow: "md",
                      }}
                      _hover={{
                        bg: "none"
                      }}
                      _active={{
                        bg: "none"
                      }}
                    >
                      <Text flex="1" textAlign="left">Ingredients</Text>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel py={4}>
                      {data.ingredients.map((ingredient, index) => (
                        <Text key={index} mb={2}><Icon as={BsCheck2All} w={5} h={5} color="green" mr={1} mb={-1} />{ingredient}</Text>
                      ))}
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Flex>
            </Flex>
          </SlideFade>

          <Flex direction="column" w={["90%", "75%", "60%", "50%", "40%"]}>
            {user && data.reviews.map((review, index) => {
              if (review.user === user._id) {
                return (
                  <SlideFade in={review} offsetY={-50} key={index}>
                    <Box 
                      bg={useColorModeValue("blackAlpha.200", "whiteAlpha.200")}
                      boxShadow="lg"
                      borderRadius="xl"
                      m={3}
                      p={5}
                      w="100%"
                      color="purple.500"
                      border="1px"
                      position="relative"
                    >
                      <Flex align="center" mb={2} wrap="wrap">
                        {show ? (
                          <Text mr={2}>
                            <Icon as={BsHash} w={5} h={5} mb={-1} />{review.user}
                          </Text>
                        ) : (
                          <Text mr={2}>
                            <Icon as={BsPersonFill} w={5} h={5} mr={2} mb={-1} />{review.name}
                          </Text>
                        )}
                        <Button size="sm" my={2} onClick={() => setShow(!show)}>{show ? "show person" : "show ID"}</Button>
                      </Flex>
                      <Text mb={4}>
                        <Icon as={BsFillChatTextFill} w={5} h={5} mr={2} mb={-1} />{review.comment}
                      </Text>
                      <Rating
                        value={review.rating}
                      />
                      <Box position="absolute" bottom={7} right={7}>
                        <Text fontSize="sm">Your review</Text>
                      </Box>
                    </Box>
                  </SlideFade>
                )
              }
            })}

            {user && data.reviews.map((review, index) => {
              if (review.user !== user._id) {
                return (
                  <SlideFade in={review} offsetY={-50} key={index}>
                    <Box 
                      bg={background}
                      boxShadow="lg"
                      borderRadius="xl"
                      m={3}
                      p={5}
                      w="100%"
                      color="purple.500"
                    >
                      <Flex align="center" mb={2} wrap="wrap">
                        {showID ? (
                          <Text mr={2}>
                            <Icon as={BsHash} w={5} h={5} mb={-1} />{review.user}
                          </Text>
                        ) : (
                          <Text mr={2}>
                            <Icon as={BsPersonFill} w={5} h={5} mr={2} mb={-1} />{review.name}
                          </Text>
                        )}
                        <Button size="sm" my={2} onClick={() => setShowID(!showID)}>{showID ? "show person" : "show ID"}</Button>
                      </Flex>
                      <Text mb={4}>
                        <Icon as={BsFillChatTextFill} w={5} h={5} mr={2} mb={-1} />{review.comment}
                      </Text>
                      <Rating
                        value={review.rating}
                      />
                    </Box>
                  </SlideFade>
                )
              }
            })}
          </Flex>

          {user?.auth ? (
            <SlideFade in={user} offsetY={-50}>
              <Box 
                bg={background}
                boxShadow="lg"
                borderRadius="xl"
                m={3}
                p={5}
                color="purple.500"
                w={["90%", "75%", "60%", "50%", "40%"]}
              >
                <Text fontWeight="500" m={2} p={2}>You must have an account to add your wishes to the list!</Text>
                <Link href="/account/register" passHref>
                  <Button>Create an account!</Button>
                </Link>
              </Box>
            </SlideFade>
          ) : data?.reviews.filter(review => review.user === user?._id).length > 0 ? (
            null
          ) : !postComment ? (
            <SlideFade in={user} offsetY={-50}>
              <Box 
                bg={background}
                boxShadow="lg"
                borderRadius="xl"
                m={3}
                p={5}
                color="purple.500"
                w={["90%", "75%", "60%", "50%", "40%"]}
              >
                <Button onClick={() => setPostComment(!postComment)}>Post a comment</Button>
              </Box>
            </SlideFade>
          ) : (
            <SlideFade in={user} offsetY={-50}>
              <Formik
                initialValues={{
                  rating: 0,
                  comment: ""
                }}
                validationSchema={commentSchema}
                onSubmit={(values) => createComment(values)}
              >
                {({ values, errors, touched }) => (
                  <SlideFade in={user} offsetY={-50}>
                    <FormContainer align="start" mx={3} p={5}>
                      <SelectForm
                        name="rating"
                        value={values.rating}
                        icon={BsLock}
                        error={errors.rating && touched.rating && errors.rating}
                      />
                      <InputForm
                        name="comment"
                        as={Textarea}
                        type="text"
                        placeholder="Post a comment..."
                        icon={BsFillChatTextFill}
                        error={errors.comment && touched.comment && errors.comment}
                        size="sm"
                      />
                      <Button type="submit" mt={2}>Post</Button>
                    </FormContainer>
                  </SlideFade>
                )}
              </Formik>
            </SlideFade>
          )}

        </Flex>
      </Container>
    )
  }

  return null
}

export default function Home() {
  const { id } = useRouter().query
  const { data } = useSWR(id && `/api/product/${id}`)

  return (
    <Layout title={data ? `${data?.name}` : "Shop"}>
      <Content id={id} data={data} />
    </Layout>
  )
}

// const deleteReview = (values) => {
  //   mutate(id && `/api/review/${id}`, () => 
  //     fetcher(id && `/api/review/${id}`, {
  //       method: 'DELETE',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         review: values.review
  //       })
  //     })
  //   )
  // }

{/* {user && (
            <Formik
              initialValues={{
                review: ""
              }}
              validationSchema={deleteReviewSchema}
              onSubmit={(values) => deleteReview(values)}
            >
              {({ errors, touched }) => (
                <FormContainer>
                  <InputForm
                    name="review"
                    as={Input}
                    type="text"
                    placeholder="Place the id of review..."
                    icon={BsLock}
                    error={errors.review && touched.review && errors.review}
                  />
                </FormContainer>
              )}
            </Formik>
          )} */}