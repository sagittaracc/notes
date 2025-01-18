import styles from "./page.module.css";
import NoteList from "@/components/note-list/note-list";
import Note from "@/components/note/note";
import { getNoteList } from "@/lib/notes";
import { IHomePageRequest } from "@/types/home-page";

export default async function Home(request: IHomePageRequest) {
  const searchParams = await request.searchParams;
  const notes = await getNoteList(searchParams);

  return (
    <>
      <NoteList notes={notes}/>
      <Note/>
    </>
  );
}
