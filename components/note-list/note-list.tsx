import NoteProvider from '@/lib/notes';
import React, { FC } from 'react'
import Paginator from '../paginator/paginator';
import { INote } from '@/types/note';
import NoteItem from '../note-item/note-item';
import Placeholder from '../placeholder/placeholder';

type TNoteListProps = {
  dataProvider: NoteProvider
}

const NoteList: FC<TNoteListProps> = async ({ dataProvider }) => {
  const notes = await dataProvider.order('createdAt', 'desc').fetch() as Array<INote>;

  return (
    <div style={{minHeight: 390, position: 'relative'}}>
      {notes.length === 0 && <Placeholder text="Нет заметок"/>}

      {notes.map(note => <NoteItem key={note.id} note={note} />)}

      {
        dataProvider.tooBig()
          && <Paginator
              currentPage={dataProvider.currentPage}
              pageCount={dataProvider.pageCount}/>}
    </div>
  )
}

export default NoteList