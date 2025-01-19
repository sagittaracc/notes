"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";

export const createOrUpdateNote = async (formData: FormData) => {
  const id = formData.get("id") as unknown as number;
  const text = formData.get("text") as string;

  if (id) {
    await prisma.note.update({
      where: { id: Number(id) },
      data: { text }
    });
  }
  else {
    await prisma.note.create({
      data: { text }
    });
  }

  revalidatePath("/");
}