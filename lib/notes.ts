import { INote } from "@/types/note";
import ActiveProvider from "./active-provider";
import { prisma } from "./prisma";

export default class NoteProvider extends ActiveProvider {
  all(): Promise<INote[]> {
    return prisma.note.findMany(this.prismaQuery);
  }

  count(): Promise<number> {
    return prisma.note.count();
  }
}