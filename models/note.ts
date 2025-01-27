import BaseModel from "@/lib/base-model";
import { prisma } from "@/lib/prisma";

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

  async query(): Promise<[object[], number]> {
    return prisma.$transaction([
      prisma.note.findMany({skip: this.offset, take: this.limit, orderBy: this.orderBy}),
      prisma.note.count(),
    ]);
  }
}

export default Note;