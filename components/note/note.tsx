"use client";

import { createOrUpdateNote } from '@/lib/actions';
import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react';
import noteStore from '../../store';

const Note = () => {
  const [noteText, setNoteText] = useState<string>('');

  useEffect(() => {
    setNoteText(noteStore.selectedNoteText);
  }, [noteStore.selectedNoteId])

  return (
    <form action={createOrUpdateNote}>
      <div>
        <textarea value={noteText} onChange={e => setNoteText(e.target.value)} name="note"/>
      </div>
      <div>
        <button type="submit">Сохранить</button>
      </div>
    </form>
  )
}

export default observer(Note)