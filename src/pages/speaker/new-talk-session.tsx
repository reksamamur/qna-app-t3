import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

import { api } from "../../utils/api";
import { useZodForm } from "../../utils/form";
import { addTalkSessionSchema } from "../../utils/zodSchema";

const NewTalkSession: NextPage = () => {
  const [error, setError] = useState("");
  const router = useRouter();

  const mutation = api.talkSession.addTalkSession.useMutation({
    onError(error) {
      setError(error.message);
    },
    onSuccess(data) {
      router.push(`/talk-session/${data.id}`);
    },
  });

  const form = useZodForm({
    schema: addTalkSessionSchema,
    defaultValues: {
      name: "",
    },
  });

  return (
    <>
      <h2 className="text-2xl font-bold">Create a Talk Session</h2>

      {error !== "" && <p className="text-red-500">{error}</p>}
      <form
        onSubmit={form.handleSubmit(async (values) => {
          await mutation.mutateAsync(values);
        })}
        className="space-y-2"
      >
        <div>
          <label>Talk Session Name</label>
          <input {...form.register("name")} className="border" />

          {form.formState.errors.name?.message && (
            <p className="text-red-700">
              {form.formState.errors.name?.message}
            </p>
          )}
        </div>

        <button type="button" onClick={() => router.back()}>
          Cancel
        </button>

        <button
          type="submit"
          disabled={mutation.isLoading}
          className="bg-secondary-500 border p-2 font-bold"
        >
          {mutation.isLoading ? "Loading" : "Submit"}
        </button>
      </form>
    </>
  );
};

export default NewTalkSession;
