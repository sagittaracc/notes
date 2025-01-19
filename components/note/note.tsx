"use client";

import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react';
import noteStore from '../../store';
import { createOrUpdateNote } from '@/lib/actions';

const Note = () => {
  const [noteId, setNoteId] = useState<number | null>(null);
  const [noteText, setNoteText] = useState<string>('');

  useEffect(() => {
    setNoteId(noteStore.selectedNoteId);
    setNoteText(noteStore.selectedNoteText);
  }, [noteStore.selectedNoteId])

  return (
    <form action={createOrUpdateNote}>
      <div>
        <textarea value={noteText} onChange={e => setNoteText(e.target.value)} name="text"/>
        <input value={noteId || ''} type="hidden" name="id"/>
      </div>
      <div>
        <button type="submit">Сохранить</button>
      </div>
    </form>
  )
}

export default observer(Note)