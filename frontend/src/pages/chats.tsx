import Head from "next/head";
import { useEffect } from "react";
import { api } from "../api";
import { Link } from "../components/Link";
import { useUser } from "../hooks/useUser";

export default function ChatsPage() {
  const { user, isLoading, isError } = useUser({ redirect: true })
  
  if (!user) {
    return <h1>Loading...</h1>
  }
  return (
    <div>
      <Head>
        <title>Chats</title>
      </Head>
      <Link href='/'>To Home Page</Link>
      <main>
        <h1>Protected Chats page of user {user.email}</h1>
      </main>
    </div>
  )
}