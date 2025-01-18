import { INote } from "@/types/note";
import ActiveProvider from "./active-provider";
import { prisma } from "./prisma";

export default class NoteProvider extends ActiveProvider {
  async all(): Promise<INote[]> {
    return await prisma.note.findMany(this.prismaQuery);
  }
}