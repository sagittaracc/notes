import NoteProvider from '@/lib/notes';
import React, { FC } from 'react'
import Paginator from '../paginator/paginator';
import { INote } from '@/types/note';
import NoteItem from '../note-item/note-item';
import Placeholder from '../placeholder/placeholder';
import styles from './note-list.module.scss';

type TNoteListProps = {
  dataProvider: NoteProvider
}

const NoteList: FC<TNoteListProps> = async ({ dataProvider }) => {
  const notes = await dataProvider.order('createdAt', 'desc').fetch() as Array<INote>;

  return (
    <div className={`${styles.notes} flex-column justify`}>
      {
        notes.length === 0 &&
          <Placeholder text="Нет заметок"/>
      }

      {
        notes.length &&
          <div className={`${styles.list} flex-column`}>
            {notes.map(note => <NoteItem key={note.id} note={note} />)}
          </div>
      }

      {
        dataProvider.tooBig() &&
          <div className="mt-2">
            <Paginator
              currentPage={dataProvider.currentPage}
              pageCount={dataProvider.pageCount}/>
          </div>
      }
    </div>
  )
}

export default NoteList