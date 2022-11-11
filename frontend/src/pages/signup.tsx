import { Button, Input, Stack } from "@chakra-ui/react";
import Head from "next/head";
import { Link } from "../components/Link";

export default function SignupPage() {
  return (
    <div>
      <Head>
        <title>Sign Up</title>
      </Head>
      <main>
        <Link href='/'>To Home page</Link>
        <h1>Sign Up page</h1>
        <Stack spacing={3}>
          <Input placeholder='Enter username' size='lg' />
          <Input placeholder='Email' size='lg' />
          <Input placeholder='Password' size='lg' />
          <Button>Sign up</Button>
        </Stack>
      </main>
    </div>
  )
}