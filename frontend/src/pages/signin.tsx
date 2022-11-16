import { Button, Input, Stack } from "@chakra-ui/react";
import Head from "next/head";
import Router from "next/router";
import { mutate } from "swr";
import { Link } from "../components/Link";
import { useAuth } from "../hooks/useAuth";
import { useUser } from "../hooks/useUser";
import { makeRequest } from "../lib/axios";

export default function SigninPage() {
  const {user, isError, mutate} = useUser()

  if (user) {
    Router.replace('/chats')
  }

  const login = async () => {
    console.log('click')
    const res = await makeRequest().post('/auth/signin', {
      email: 'test@test.com',
      password: '12345678'
    })
  }

  const submit = async () => {
    await login()
    mutate()
  }

  return (
    <div>
      <Head>
        <title>Sign In</title>
      </Head>
      <main>
        <Link href='/'>To Home page</Link>
        <h1>Sign In page</h1>
        <Stack spacing={3}>
          <Input placeholder='Email' size='lg' />
          <Input placeholder='Password' size='lg' />
          <Button onClick={submit}>Sign in</Button>
        </Stack>
      </main>
    </div>
  )
}