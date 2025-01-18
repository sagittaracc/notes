import { INote } from "@/types/note";
import { prisma } from "./prisma";

export const getNoteList = async (): Promise<INote[]> => {
  const notes = await prisma.note.findMany({
    orderBy: [
      {
        createdAt: 'desc'
      }
    ]
  });

  return notes;
};