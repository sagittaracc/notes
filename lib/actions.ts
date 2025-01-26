"use server";

import Note from "@/models/note";
import { revalidatePath } from "next/cache";

export const saveNote = async (formData: FormData) => {
  const id = formData.get("id") as unknown as number;
  const text = formData.get("text") as string;

  const note = new Note();
  note.id = Number(id);
  note.text = text;
  await note.save();

  revalidatePath("/");
}

export const deleteNote = async (formData: FormData) => {
  const id = formData.get("id") as unknown as number;

  const note = Note.findById(Number(id));
  await note.delete();

  revalidatePath("/");
}