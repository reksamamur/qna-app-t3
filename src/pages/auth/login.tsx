import type { NextPage } from "next";
import { useZodForm } from "@utils/form";
import { loginSchema } from "@utils/zodSchema";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { TypeOf } from "zod";

const LoginPage: NextPage = () => {
  const form = useZodForm({
    schema: loginSchema,
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleGoogleSignIn() {
    signIn("google");
  }

  async function handlePasswordlessSignIn(
    data: Pick<TypeOf<typeof loginSchema>, "email">
  ) {
    signIn("email", { ...data });
  }

  async function handleSignIn(data: TypeOf<typeof loginSchema>) {
    signIn("credentials", { ...data });
  }

  return (
    <div className="grid min-h-screen grid-cols-3 items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] p-4">
      <div className="col-start-2 col-end-2 flex flex-col gap-10">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=white"
            alt="QnA"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
            Sign in to your account
          </h2>
          <p className="text-md mt-2 text-center text-white">
            <span className="mr-1">Or</span>
            <Link
              href="/auth/register"
              className="font-medium text-indigo-400 hover:text-indigo-300"
            >
              Register
            </Link>
          </p>
        </div>
        <div className="h-full rounded bg-slate-50">
          <form
            onSubmit={form.handleSubmit(handleSignIn)}
            className="grid gap-5 p-4"
          >
            <div className="rounder-xl border">
              <input
                {...form.register("email")}
                placeholder="Email"
                className="relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <button
              onClick={() =>
                handlePasswordlessSignIn({ email: form.getValues("email") })
              }
              type="button"
              className="rounded bg-[#2e026d] p-2 font-semibold text-white hover:bg-[#461091]"
            >
              Passwordless Login
            </button>
            <hr className="h-px border-0 dark:bg-gray-700" />
            <div className="rounder-xl border">
              <input
                {...form.register("password")}
                type="password"
                placeholder="Password"
                className="relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={false}
              className="rounded bg-[#2e026d] p-2 font-semibold text-white hover:bg-[#461091]"
            >
              Login
            </button>
            <hr className="h-px border-0 dark:bg-gray-700" />
            <button
              onClick={handleGoogleSignIn}
              className="flex justify-center gap-2 rounded border-2 p-2 font-semibold hover:bg-gray-200"
            >
              Sign In Google
              <Image
                src={"/assets/google.svg"}
                alt="Google"
                height={20}
                width={20}
              />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
