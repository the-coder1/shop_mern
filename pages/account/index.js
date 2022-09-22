import { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import Router from "next/router";
import { useSWRConfig } from "swr"
import { useUser } from "../../utils/user";
import Load from "../../components/Load";
import { Formik } from "formik";
import FormContainer from "../../components/form/FormContainer";
import InputForm from "../../components/form/InputForm";
import { BsArrowLeft, BsEnvelope, BsLock, BsPencil, BsPerson, BsTelephone } from "react-icons/bs";
import * as yup from "yup"
import { Alert, AlertIcon, Button, Flex, Heading, Icon, SlideFade, Text, useColorModeValue } from "@chakra-ui/react";
import { fetcher } from "../../utils/api";

const updateUserSchema = yup.object().shape({
  name: yup.object().shape({
    first: yup.string().required("First name is required!"),
    last: yup.string().required("Last name is required!")
  }),
  email: yup.string().email("Invalid email format!").required("Email is required!!"),
  phone: yup.string().matches(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/, "Phone number is not valid!").required("Phone number is required!")
})

const updatePassSchema = yup.object().shape({
  oldPassword: yup.string().required("Old password is required!"),
  newPassword: yup.string().required("New password is required!"),
  confirmNewPassword: yup.string().required("Confirm your new password!").oneOf([yup.ref('newPassword'), null], 'Passwords must match!')
})

function Content() {
  const { user, loading } = useUser()
  const { mutate } = useSWRConfig()
  const color = useColorModeValue("blackAlpha.700", "whiteAlpha.700")
  const background = useColorModeValue("blackAlpha.50", "whiteAlpha.50")
  const [changeUser, setChangeUser] = useState(false)
  const [changePass, setChangePass] = useState(false)
  const [message, setMessage] = useState(false)

  useEffect(() => {
    if (user?.auth) {
      Router.push('/account/login')
    }
    if (user?.error) {
      setMessage(user.error)
    }
    if (user?.message) {
      setMessage()
    }
  }, [user])

  // const deleteUser = () => {
  //   const userInfo = localStorage.getItem('user')

  //   mutate('/api/auth/user', () => {
  //     fetcher('/api/auth/user', {
  //       method: 'DELETE',
  //       headers: {
  //         "Authorization": `Bearer ${userInfo}`
  //       }
  //     })
  //   })

  //   localStorage.removeItem('user')
  //   Router.push('/')
  // }
  

  const updateUser = (values) => {
    mutate('/api/user', 
      fetcher('/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: {
            first: values.name.first || user.name.first,
            last: values.name.last || user.name.last,
          },
          email: values.email || user.email,
          phone: values.phone || user.phone,
        })
      })
    )
  }

  const updatePass = (values) => {
    mutate('/api/user', 
      fetcher('/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          oldPassword: values.oldPassword,
          newPassword: values.newPassword
        })
      })
    )
  }

  if (loading) {
    return (
      <Load />
    )
  }

  if (!user?.auth) {
    return (
      changeUser ? (
        <Formik
          initialValues={{
            name: {
              first: user?.name?.first || "",
              last: user?.name?.last || "",
            },
            email: user?.email || "",
            phone: user?.phone || ""
          }}
          validationSchema={updateUserSchema}
          onSubmit={(values) => updateUser(values)}
        >
          {({ errors }) => (
            <SlideFade in={user} offsetY={-50}>
              <FormContainer position="relative">
                {message && (
                  <SlideFade in={message} offsetY={-50}>
                    <Alert status='error' borderRadius="xl" boxShadow="md" w="75%" mx="auto">
                      <AlertIcon />
                      {message}
                    </Alert>
                  </SlideFade>
                )}
                <Button
                  onClick={() => {
                    setChangeUser(!changeUser)
                    setMessage()
                  }}
                  position="absolute"
                  top={3}
                  left={3}
                  size="sm"
                >
                  <Icon as={BsArrowLeft} w={5} h={5} />
                </Button>
                <Flex w={["90%", "85%", "80%", "75%", "70%"]} mt={5}>
                  <InputForm
                    name="name.first"
                    type="text"
                    placeholder="First name"
                    icon={BsPerson}
                    error={errors.name?.first}
                    mr={2}
                  />

                  <InputForm
                    name="name.last"
                    type="text"
                    placeholder="Last name"
                    icon={BsPerson}
                    error={errors.name}
                    ml={2}
                  />
                </Flex>
                <InputForm
                  name="email"
                  type="email"
                  placeholder="Email"
                  icon={BsEnvelope}
                  error={errors.email}
                />
                <InputForm
                  name="phone"
                  type="tel"
                  placeholder="Phone number"
                  icon={BsTelephone}
                  error={errors.phone}
                />
                <Button type="submit" mt={3}>Update</Button>
              </FormContainer>
            </SlideFade>
          )}
        </Formik>
      ) : changePass ? (
        <Formik
          initialValues={{
            oldPassword: "",
            newPassword: "",
            confirmNewPassword: "",
          }}
          validationSchema={updatePassSchema}
          onSubmit={(values) => updatePass(values)}
        >
          {({ errors }) => (
            <SlideFade in={user} offsetY={-50}>
              <FormContainer position="relative">
                {message && (
                  <SlideFade in={message} offsetY={-50}>
                    <Alert status='error' borderRadius="xl" boxShadow="md" w="75%" mx="auto">
                      <AlertIcon />
                      {message}
                    </Alert>
                  </SlideFade>
                )}
                <Button
                  onClick={() => {
                    setChangePass(!changePass)
                    setMessage()
                  }}
                  position="absolute"
                  top={3}
                  left={3}
                  size="sm"
                >
                  <Icon as={BsArrowLeft} w={5} h={5} />
                </Button>
                <InputForm
                  name="oldPassword"
                  type="password"
                  placeholder="Old password"
                  icon={BsLock}
                  error={errors.oldPassword}
                  mt={9}
                />
                <InputForm
                  name="newPassword"
                  type="password"
                  placeholder="New password"
                  icon={BsLock}
                  error={errors.newPassword}
                />
                <InputForm
                  name="confirmNewPassword"
                  type="password"
                  placeholder="Confirm new password"
                  icon={BsLock}
                  error={errors.confirmNewPassword}
                />
                <Button type="submit" mt={3}>Update</Button>
              </FormContainer>
            </SlideFade>
          )}
        </Formik>
      ) : (
        <SlideFade in={user} offsetY={-50}>
          <Flex
            direction="column"
            align="center"
            boxShadow="lg"
            borderRadius="2xl"
            bg={background}
            py={6}
            px={3}
            w={["90%", "75%", "60%", "45%", "30%"]}
            mx="auto"
            my={10}
            position="relative"
          >
            <Button 
              onClick={() => setChangeUser(!changeUser)}
              position="absolute"
              top={5}
              right={5}
              size="sm"
            >
              <Icon as={BsPencil} w={5} h={5} />
            </Button>
            <Heading
              as="h2" 
              size="md" 
              mt={10}
              mb={3}
            >
              {user?.name?.first} {user?.name?.last}
            </Heading>
            <Text
              fontSize="xl" 
              fontWeight="500"
              color={color}
              mb={3}
            >
              {user.email}
            </Text>
            <Button
              onClick={() => setChangePass(!changePass)}
              mt={5}
            >
              Change password
            </Button>
            <Button
              onClick={() => {
                mutate('/api/user', 
                  fetcher('/api/user', {
                    method: 'DELETE',
                  })
                )
              }}
              mt={5}
            >
              Logout
            </Button>
          </Flex>
        </SlideFade>
      )
    )
  }

  return null
}

export default function Account() {
  return (
    <Layout title="Echo - Account">
      <Content />
      {/* <Button onClick={deleteUser}>Delete</Button> */}
    </Layout>
  )
}

{/*
  <Accordion defaultIndex={[0]} allowMultiple mb={3} w="50%" mx="auto">
          <AccordionItem borderRadius="xl">
            <AccordionButton 
              boxShadow="sm"
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
              <Text flex="1" textAlign="left">Wishes</Text>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel py={4}>
              <Flex 
                direction="column"
                align="start"
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
                              click={() => {
                                mutate(item && `/api/wish/${item}`, () =>
                                  fetcher(item && `/api/wish/${item}`, {
                                    method: 'DELETE'
                                  })
                                )
                                mutate('/api/user/auth', () => {
                                  fetcher('/api/user/auth')
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
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem borderRadius="xl">
            <AccordionButton
              boxShadow="sm"
              _expanded={{ 
                bg: 'purple.500', 
                color: color, 
                borderRadius: "xl",
                boxShadow: "md"
              }}
            >
              <Text flex="1" textAlign="left">Details</Text>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel py={4}>
              
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
*/}
