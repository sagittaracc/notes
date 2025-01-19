"use client";

import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react';
import noteStore from '../../store';
import { createOrUpdateNote, deleteNote } from '@/lib/actions';
import styles from './note.module.scss';

const Note = () => {
  const [noteId, setNoteId] = useState<number | null>(null);
  const [noteText, setNoteText] = useState<string>('');

  useEffect(() => {
    setNoteId(noteStore.selectedNoteId);
    setNoteText(noteStore.selectedNoteText);
  }, [noteStore.selectedNoteId])

  return (
    <>
      <div className={styles.note}>
        <textarea cols={1} rows={5} value={noteText} onChange={e => setNoteText(e.target.value)}></textarea>
      </div>

      <div className={styles.form}>
        <form action={createOrUpdateNote}>
          <input type="hidden" name="text" value={noteText} />
          <input type="hidden" name="id" value={noteId || ''} />
          <button type="submit">Сохранить</button>
        </form>

        <form action={deleteNote}>
          <input type="hidden" name="id" value={noteId || ''} />
          <button type="submit">Удалить</button>
      </form>
      </div>
    </>
  )
}

export default observer(Note)