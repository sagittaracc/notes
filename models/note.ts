import BaseModel from "@/lib/base-model";
import { prisma } from "@/lib/prisma";
import { PrismaPromise } from "@prisma/client";

class Note extends BaseModel
{
  public id?: number;
  public text: string = '';

  save() {
    if (this.id) {
      return prisma.note.update({
        where: { id: this.id },
        data: { text: this.text }
      });
    }
    else {
      return prisma.note.create({
        data: { text: this.text }
      });
    }
  }

  static delete(id: number) {
    return prisma.note.delete({
      where: { id }
    });
  }

  async query<U>(): Promise<[U[], number]> {
    return prisma.$transaction([
      prisma.note.findMany({skip: this.offset, take: this.limit, orderBy: this.orderBy}) as PrismaPromise<U[]>,
      prisma.note.count(),
    ]);
  }
}

export default Note;