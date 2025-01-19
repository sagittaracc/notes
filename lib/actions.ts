"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";

export const createOrUpdateNote = async (formData: FormData) => {
  const note = formData.get("note") as string;
  const newNote = true;

  if (newNote) {
    await prisma.note.create({
      data: {
        text: note
      }
    });
  }
  else {
    // ... updating
  }

  revalidatePath("/");
}