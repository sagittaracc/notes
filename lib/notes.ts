import { INote } from "@/types/note";
import { prisma } from "./prisma";
import { TPaginationRequest } from "@/types/pagination";

export const getNoteList = async (searchParams: TPaginationRequest): Promise<INote[]> => {
  const page = searchParams.page || 1;

  const notes = await prisma.note.findMany({
    skip: (page - 1) * 5,
    take: 5,
    orderBy: [
      {
        createdAt: 'desc'
      }
    ]
  });

  return notes;
};