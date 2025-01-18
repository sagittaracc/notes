import NoteProvider from '@/lib/notes';
import React, { FC } from 'react'

type NoteListProps = {
  dataProvider: NoteProvider
}

const NoteList: FC<NoteListProps> = async ({ dataProvider }) => {
  const notes = await dataProvider.order('createdAt', 'desc').all();

  return (
    <>
      {notes.map(note => <p key={note.id}>{note.text}</p>)}
    </>
  )
}

export default NoteList