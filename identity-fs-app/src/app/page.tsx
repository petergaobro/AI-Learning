/** frontend */
import Button from "./components/button";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/authOptions";
import { User } from "./components/user";

export default async function Home() {
  const session = await getServerSession(authOptions)


  return (
    // flex-row
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="flex flex-row items-center gap-2">
        <Button href="/login" className="">Login</Button>
        <Button href="/register" color="accent" className="text-black">Register</Button>
        <Button href="/forgetPassword" color="secondary" className="text-black">Forget password</Button>
        <Button href="/d-id" inverse color="accent" className="text-black">D id</Button>
        <Button href="/webrtc" color="accent" className="text-black">webrtc</Button>
      </div>
      <div>---------------------For testing----------------------</div>
      <div className="flex flex-col">
        <div>server session
          <pre>{JSON.stringify(session)}</pre>
        </div>
        <div>
          client call
          <User />
        </div>
      </div>
    </main>
  );
}