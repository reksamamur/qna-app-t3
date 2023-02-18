import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";

import { useZodForm } from "@utils/form";
import { registerSchema } from "@utils/zodSchema";

const RegisterPage: NextPage = () => {
  const form = useZodForm({
    schema: registerSchema,
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  return (
    <div className="grid min-h-screen grid-cols-3 items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] p-4">
      <div className="col-start-2 col-end-2 flex flex-col gap-10">
        <div>
          <Image
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=white"
            alt="QnA"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
            Register your account
          </h2>
          <p className="text-md mt-2 text-center text-white">
            <span className="mr-1">Or</span>
            <Link
              href="/auth/login"
              className="font-medium text-indigo-400 hover:text-indigo-300"
            >
              Sign In
            </Link>
          </p>
        </div>
        <div className="h-full rounded bg-slate-50">
          <form
            onSubmit={
              void form.handleSubmit((values) => {
                //TODO
                console.log(values);
              })
            }
            className="grid gap-5 p-4"
          >
            <div className="rounder-xl border">
              <input
                {...form.register("name")}
                placeholder="Name"
                className="relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="rounder-xl border">
              <input
                {...form.register("email")}
                placeholder="Email"
                className="relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div>
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
              {false ? "Loading" : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
