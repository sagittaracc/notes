import NoteProvider from '@/lib/notes';
import React, { FC } from 'react'
import Paginator from '../paginator/paginator';
import { INote } from '@/types/note';

type NoteListProps = {
  dataProvider: NoteProvider
}

const NoteList: FC<NoteListProps> = async ({ dataProvider }) => {
  const notes = await dataProvider.order('createdAt', 'desc').fetch() as Array<INote>;

  return (
    <>
      {notes.map(note => <p key={note.id}>{note.text}</p>)}

      {
        dataProvider.tooBig()
          && <Paginator
              currentPage={dataProvider.currentPage}
              pageSize={dataProvider.pageSize}
              totalCount={dataProvider.totalCount}/>}
    </>
  )
}

export default NoteList