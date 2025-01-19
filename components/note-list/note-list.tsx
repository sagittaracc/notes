import NoteProvider from '@/lib/notes';
import React, { FC } from 'react'
import Paginator from '../paginator/paginator';
import { INote } from '@/types/note';
import NoteItem from '../note-item/note-item';

type TNoteListProps = {
  dataProvider: NoteProvider
}

const NoteList: FC<TNoteListProps> = async ({ dataProvider }) => {
  const notes = await dataProvider.order('createdAt', 'desc').fetch() as Array<INote>;

  return (
    <>
      {notes.map(note => <NoteItem key={note.id} note={note} />)}

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