import styles from "./page.module.css";
import NoteList from "@/components/note-list/note-list";
import Note from "@/components/note/note";
import { getNoteList } from "@/lib/notes";

export default async function Home() {
  const notes = await getNoteList();

  return (
    <>
      <NoteList notes={notes}/>
      <Note/>
    </>
  );
}
