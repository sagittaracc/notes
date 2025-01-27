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

  delete() {
    if (this.id) {
      return prisma.note.delete({
        where: { id: this.id }
      });
    }
  }

  count(): PrismaPromise<number> {
    return prisma.note.count();
  }

  findMany(): PrismaPromise<object[]> {
    return prisma.note.findMany({
      skip: this.offset,
      take: this.limit,
      orderBy: this.orderBy
    });
  }

  async query(): Promise<[object[], number]> {
    return prisma.$transaction([
      this.findMany(),
      this.count()
    ]);
  }

  static findById(id: number) {
    const model = this.model();
    model.id = id;

    return model;
  }
}

export default Note;