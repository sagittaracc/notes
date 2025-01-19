"use client";

import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react';
import noteStore from '../../store';
import { createOrUpdateNote, deleteNote } from '@/lib/actions';

const Note = () => {
  const [noteId, setNoteId] = useState<number | null>(null);
  const [noteText, setNoteText] = useState<string>('');

  useEffect(() => {
    setNoteId(noteStore.selectedNoteId);
    setNoteText(noteStore.selectedNoteText);
  }, [noteStore.selectedNoteId])

  return (
    <>
      <textarea value={noteText} onChange={e => setNoteText(e.target.value)}></textarea>

      <form action={createOrUpdateNote}>
        <input type="hidden" name="text" value={noteText} />
        <input type="hidden" name="id" value={noteId || ''} />
        <button type="submit">Сохранить</button>
      </form>

      <form action={deleteNote}>
        <input type="hidden" name="id" value={noteId || ''} />
        <button type="submit">Удалить</button>
      </form>
    </>
  )
}

export default observer(Note)