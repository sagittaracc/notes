"use client";

import React, { FC } from 'react'
import { observer } from 'mobx-react';
import noteStore from '../../store';

type TNoteItemProps = {
  note: {
    id: number
    text: string
  }
}

const NoteItem: FC<TNoteItemProps> = ({ note }) => {
  return (
    <p onClick={() => noteStore.selectNote(note.id, note.text)}>{note.text}</p>
  )
}

export default observer(NoteItem)