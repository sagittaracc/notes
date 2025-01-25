"use client";

import React, { FC } from 'react'
import { observer } from 'mobx-react';
import noteStore from '../../store';
import styles from './note-item.module.scss';
import { INote } from '@/types/note';
import moment from 'moment';

type TNoteItemProps = {
  note: INote
}

const NoteItem: FC<TNoteItemProps> = ({ note }) => {

  const edit = (note: INote) => (
    noteStore.selected(note)
      ? noteStore.deselect()
      : noteStore.select(note.id, note.text)
  );

  return (
    <div className={`${styles.item} p-2 pointer ${noteStore.selected(note) ? styles.active : ''}`} onClick={() => edit(note)}>
      <p className="m-0">{note.text}</p>
      <p className="m-0 text-right text-inactive font-small">
        {moment(note.createdAt).format('DD.MM.YYYY')}
      </p>
    </div>
  )
}

export default observer(NoteItem)