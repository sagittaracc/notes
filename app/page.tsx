import NoteList from "@/components/note-list/note-list";
import Note from "@/components/note/note";
import Separator from "@/components/separator/separator";
import NoteProvider from "@/lib/notes";
import { IHomePageRequest } from "@/types/home-page";

export default async function Home(request: IHomePageRequest) {
  const searchParams = await request.searchParams;
  const dataProvider = new NoteProvider(searchParams);

  return (
    <main>
      <NoteList dataProvider={dataProvider}/>
      <Separator/>
      <Note/>
    </main>
  );
}
