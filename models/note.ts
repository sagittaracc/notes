import { prisma } from "@/lib/prisma";
import { INote } from "@/types/note";
import { TOrderBy } from "@/types/order";

type TPrismaQuery = {
  skip: number
  take: number
  orderBy?: TOrderBy
}

class Note
{
  public id?: number;
  public text: string = '';

  static findAll() {
    return new this;
  }

  static findMany(query: TPrismaQuery): Promise<INote[]> {
    return prisma.note.findMany(query);
  }

  static findById(id: number) {
    const model = new this;
    model.id = id;
    return model;
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

  getCount(): Promise<number> {
    return prisma.note.count();
  }
}

export default Note;