import { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { useSWRConfig } from "swr"
import { fetcher } from "../../utils/api"
import { useUser } from "../../utils/user"
import Load from "../../components/Load";
import { useRouter } from "next/router";
import { Formik } from "formik";
import FormContainer from "../../components/form/FormContainer";
import InputForm from "../../components/form/InputForm";
import { Alert, AlertIcon, Button, Flex, SlideFade } from "@chakra-ui/react";
import { BsEnvelope, BsLock, BsPerson, BsTelephone } from "react-icons/bs";
import * as yup from "yup"

export const registerUserSchema = yup.object().shape({
  name: yup.object().shape({
    first: yup.string().required("First name is required!"),
    last: yup.string().required("Last name is required!")
  }),
  email: yup.string().email("Invalid email format!").required("Email is required!!"),
  phone: yup.string().matches(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/, "Phone number is not valid!").required("Phone number is required!"),
  password: yup.string().required("Password is required!"),
  confirmPassword: yup.string().required("Confirm your password!").oneOf([yup.ref('password'), null], 'Passwords must match!')
})

function Content() {
  const router = useRouter()
  const { user, loading } = useUser()
  const { mutate } = useSWRConfig()
  const [message, setMessage] = useState(user?.message)

  useEffect(() => {
    if (user?.message) {
      router.push('/')
    }
    if (user?.error) {
      setMessage(user.error)
    }
  }, [user])

  const registerUser = (values) => {
    mutate('/api/user', () =>
      fetcher('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: {
            first: values.name.first,
            last: values.name.last
          },
          email: values.email,
          phone: values.phone,
          password: values.password
        })
      })
    )
  }

  if (loading) {
    return (
      <Load />
    )
  }

  if (user?.auth || user?.error) {
    return (
      <Formik
        initialValues={{
          name: {
            first: "",
            last: ""
          },
          email: "",
          phone: "",
          password: "",
          confirmPassword: ""
        }}
        validationSchema={registerUserSchema}
        onSubmit={(values) => registerUser(values)}
      >
        {({ errors, touched }) => ( 
          <SlideFade in={user} offsetY={-50}>
            <FormContainer>
              {message && (
                <SlideFade in={message} offsetY={-50}>
                  <Alert status='error' mb={3} borderRadius="xl" boxShadow="md" w="75%" mx="auto">
                    <AlertIcon />
                    {message}
                  </Alert>
                </SlideFade>
              )}
              <Flex w={["90%", "85%", "80%", "75%", "70%"]}>
                <InputForm
                  name="name.first"
                  type="text"
                  placeholder="First name"
                  icon={BsPerson}
                  error={errors.name?.first && touched.name?.first ? errors.name?.first : null}
                  mr={2}
                />

                <InputForm
                  name="name.last"
                  type="text"
                  placeholder="Last name"
                  icon={BsPerson}
                  error={errors.name?.last && touched.name?.last ? errors.name?.last : null}
                />
              </Flex>
              <InputForm
                name="email"
                type="email"
                placeholder="Email"
                icon={BsEnvelope}
                error={errors.email && touched.email ? errors.email : null}
              />
              <InputForm
                name="phone"
                type="tel"
                placeholder="Phone number"
                icon={BsTelephone}
                error={errors.phone && touched.phone ? errors.phone : null}
              />
              <InputForm
                name="password"
                type="password"
                placeholder="Password"
                icon={BsLock}
                error={errors.password && touched.password ? errors.password : null}
              />
              <InputForm
                name="confirmPassword"
                type="password"
                placeholder="Confirm password"
                icon={BsLock}
                error={errors.confirmPassword && touched.confirmPassword ? errors.confirmPassword : null}
              />
              <Button type="submit" mt={3}>Register</Button>
            </FormContainer>
          </SlideFade>
        )}
      </Formik>
    )
  }

  return null
}

export default function Register() {
  return (
    <Layout title="Echo - Register">
      <Content />
    </Layout>
  )
}
