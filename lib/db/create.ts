import { createClient } from "@supabase/supabase-js";

interface Post {
  title: string;
  content: string;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Function to create a new post
export async function createPost(title: string, content: string) {
  const { data, error } = await supabase
    .from("recipes")
    .insert([{ title: title, content: content }])
    .select();

  if (error) {
    console.error("Error creating post:", error.message);
  } else {
    console.log("Post created successfully:", data);
  }
}
