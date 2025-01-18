import { INote } from '@/types/note'
import React, { FC } from 'react'

type NoteListProps = {
  notes: INote[]
}

const NoteList: FC<NoteListProps> = ({ notes }) => {
  return (
    <>
      {notes.map(note => <p key={note.id}>{note.text}</p>)}
    </>
  )
}

export default NoteList