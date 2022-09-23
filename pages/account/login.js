import { useEffect, useState } from "react";
import Layout from "../../layout/Layout"
import { useRouter } from "next/router"
import { useSWRConfig } from "swr"
import { useUser } from "../../utils/user"
import Load from "../../components/Load";
import { Formik } from "formik";
import FormContainer from "../../components/form/FormContainer";
import InputForm from "../../components/form/InputForm";
import { BsEnvelope, BsLock } from "react-icons/bs";
import { Alert, AlertIcon, Button, SlideFade } from "@chakra-ui/react";
import * as yup from "yup"
import { fetcher } from "../../utils/api"

export const loginUserSchema = yup.object().shape({
  email: yup.string().email("Invalid email format!").required("Please enter your email!"),
  password: yup.string().required("Please enter your password!")
})

function Content() {
  const router = useRouter()
  const { user, loading } = useUser()
  const { mutate } = useSWRConfig()
  const [message, setMessage] = useState()

  useEffect(() => {
    if (user?.message) {
      router.push('/')
    } 
    if (user?.error) {
      setMessage(user.error)
    }
  }, [user, router])

  const loginUser = (values) => {
    mutate('/api/user', () => 
      fetcher('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: values.email,
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
          email: "",
          password: ""
        }}
        validationSchema={loginUserSchema}
        onSubmit={(values) => loginUser(values)}
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
              <InputForm
                name="email"
                type="email"
                placeholder="Email"
                icon={BsEnvelope}
                error={errors.email && touched.email ? errors.email : null}
              />
              <InputForm
                name="password"
                type="password"
                placeholder="Password"
                icon={BsLock}
                error={errors.password && touched.password ? errors.password : null}
              />
              <Button type="submit" mt={3}>Login</Button>
            </FormContainer>
          </SlideFade>
        )}
      </Formik>
    )
  }

  return null
}

export default function Login() {
  return (
    <Layout title="Echo - Login">
      <Content />
    </Layout>
  )
}
