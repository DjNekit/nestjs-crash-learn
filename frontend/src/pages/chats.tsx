import Head from "next/head";
import { Link } from "../components/Link";

export default function ChatsPage() {
  return (
    <div>
      <Head>
        <title>Chats</title>
      </Head>
      <Link href='/'>To Home Page</Link>
      <main>
        <h1>Protected Chats page</h1>
      </main>
    </div>
  )
}