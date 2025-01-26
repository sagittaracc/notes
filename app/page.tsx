import NoteEditor from "@/components/note-editor/note-editor";
import NoteList from "@/components/note-list/note-list";
import Separator from "@/components/separator/separator";
import ActiveProvider from "@/lib/active-provider";
import Note from "@/models/note";
import { IHomePageRequest } from "@/types/home-page";

export default async function Home(request: IHomePageRequest) {
  const searchParams = await request.searchParams;
  const dataProvider = new ActiveProvider(Note.find(), searchParams);

  return (
    <>
      <NoteList dataProvider={dataProvider}/>
      <Separator/>
      <NoteEditor/>
    </>
  );
}