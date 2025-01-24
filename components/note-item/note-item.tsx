"use client";

import React, { FC, useState } from 'react'
import { observer } from 'mobx-react';
import noteStore from '../../store';
import styles from './note-item.module.scss';

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
    <p className={`${styles.item} p-2 m-1 pointer`} onClick={() => toggleSelect(note)}>{note.text}</p>
  )
}

export default observer(NoteItem)