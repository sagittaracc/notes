"use client";

import React, { FC } from 'react'

type TNoteItemProps = {
  note: {
    id: number
    text: string
  }
}

const NoteItem: FC<TNoteItemProps> = ({ note }) => {
  return (
    <p onClick={() => console.log(note.id)}>{note.text}</p>
  )
}

export default NoteItem