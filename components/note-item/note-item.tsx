"use client";

import React, { FC } from 'react'
import { observer } from 'mobx-react';
import noteStore from '../../store';
import styles from './note-item.module.css';

type TNoteItem = {
  id: number
  text: string
}

type TNoteItemProps = {
  note: TNoteItem
}

const toggleSelect = (note: TNoteItem) => {
  noteStore.isSelected(note.id, note.text)
    ? noteStore.deselectNote()
    : noteStore.selectNote(note.id, note.text);
}

const NoteItem: FC<TNoteItemProps> = ({ note }) => {
  return (
    <p className={styles.note} onClick={() => toggleSelect(note)}>{note.text}</p>
  )
}

export default observer(NoteItem)