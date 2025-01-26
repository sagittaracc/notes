import { INote } from "@/types/note";
import ActiveProvider from "./active-provider";
import Note from "@/models/note";

export default class NoteProvider extends ActiveProvider {
  all(): Promise<INote[]> {
    return Note.findMany({
      skip: this.offset,
      take: this.limit,
      orderBy: this.orderBy,
    })
  }

  count(): Promise<number> {
    return Note.findAll().getCount();
  }
}