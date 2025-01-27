import { prisma } from "@/lib/prisma";
import { ActiveRecord, TQuery } from "@/types/provider";
import { PrismaPromise } from "@prisma/client";

class Note
{
  public id?: number;
  public text: string = '';

  static findMany(query: TQuery): PrismaPromise<Object[]> {
    return prisma.note.findMany({
      skip: query.offset,
      take: query.limit,
      orderBy: query.orderBy
    });
  }

  static findById(id: number) {
    const model = new this;
    model.id = id;
    return model;
  }

  static model(): ActiveRecord {
    return async (query: TQuery) => {
      const [data, count] = await prisma.$transaction([
        this.findMany(query),
        this.getCount()
      ]);

      return [data, count];
    }
  }

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

  static getCount(): PrismaPromise<number> {
    return prisma.note.count();
  }
}

export default Note;