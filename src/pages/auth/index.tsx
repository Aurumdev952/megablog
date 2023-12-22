import Image from "next/image";
import { signIn } from "next-auth/react";
export default function Auth() {
  return (
    <main className="flex flex-col items-center justify-start">
      <div className="mt-20 flex w-full max-w-lg flex-col justify-start gap-2 px-5">
        <div className="flex flex-col items-center justify-center gap-5">
          <Image
            src="/logo_big.svg"
            alt="megablog logo"
            width={100}
            height={80}
          />
          <h1 className="text-2xl font-bold">Join Megablog community</h1>
        </div>
        <div className="mt-5">
          <button
            onClick={() => {
              void signIn("github", { callbackUrl: "/" });
            }}
            className="flex w-full items-center rounded-md border-[1px] border-gray-200 p-3 hover:bg-gray-100"
          >
            <Image
              src="/assets/github.svg"
              alt="github"
              width={25}
              height={25}
            />
            <div className="align-center flex w-full justify-center">
              <p>Sign in with GitHub</p>
            </div>
          </button>
          <button
            onClick={() => {
              void signIn("google", { callbackUrl: "/" });
            }}
            className="mt-5 flex w-full items-center rounded-md border-[1px] border-gray-200 p-3 hover:bg-gray-100"
          >
            <Image
              src="/assets/google.svg"
              alt="google"
              width={25}
              height={25}
            />
            <div className="align-center flex w-full justify-center">
              <p>Sign in with Google</p>
            </div>
          </button>
        </div>
      </div>
    </main>
  );
}
