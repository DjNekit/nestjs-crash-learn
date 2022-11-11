import { Button, Input, Stack } from "@chakra-ui/react";
import Head from "next/head";
import { Link } from "../components/Link";

export default function SigninPage() {
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
          <Button>Sign in</Button>
        </Stack>
      </main>
    </div>
  )
}