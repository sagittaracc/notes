"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";

export const createNote = async (formData: FormData) => {
  const note = formData.get("note") as string;

  await prisma.note.create({
    data: {
      text: note
    }
  });

  revalidatePath("/");
}