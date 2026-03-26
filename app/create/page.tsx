import CreatePageForm from "@/components/create-page/CreatePageForm";
import { createClient } from "@/service/api/supabaseServer";
import { Suspense } from "react";
export const dynamic = "force-dynamic";

export default async function CreatePage() {
  const supabase = createClient();
  console.log(supabase);

  return (
    <div className="flex h-screen items-center justify-center flex-col gap-4">
      <h1 className="text-2xl font-bold">Create a Recipe Post</h1>

      <Suspense fallback={<div>Loading...</div>}>
        <CreatePageForm />
      </Suspense>
    </div>
  );
}
