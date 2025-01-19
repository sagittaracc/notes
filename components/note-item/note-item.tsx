"use client";

import React, { FC, useState } from 'react'
import { observer } from 'mobx-react';
import noteStore from '../../store';

type TNoteItem = {
  id: number
  text: string
}

type TNoteItemProps = {
  note: TNoteItem
}

const NoteItem: FC<TNoteItemProps> = ({ note }) => {
  const [selected, setSelected] = useState<boolean>(false);

  const toggleSelect = (note: TNoteItem) => {
    selected /* eslint-disable-line */
      ? noteStore.deselect()
      : noteStore.select(note.id, note.text);

    setSelected(!selected);
  }

  return (
    <p className="item-pointer p-2 m-1" onClick={() => toggleSelect(note)}>{note.text}</p>
  )
}

export default observer(NoteItem)