"use server";

import { put } from "@vercel/blob";

export async function vercel(formData: FormData) {
  const file = formData.get("file");

  if (!(file instanceof File)) {
    throw new Error("Invalid file input");
  }

  const blob = await put(file.name, file, {
    access: "public"
  });

  return blob.url;
}