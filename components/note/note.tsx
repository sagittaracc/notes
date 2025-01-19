"use client";

import React, { FormEvent, useEffect, useState } from 'react'
import { observer } from 'mobx-react';
import noteStore from '../../store';
import { createOrUpdateNote, deleteNote } from '@/lib/actions';

const Note = () => {
  const [noteText, setNoteText] = useState<string>('');

  useEffect(() => {
    setNoteText(noteStore.selectedNoteText);
  }, [noteStore.selectedNoteId])

  const handleSubmit = (serverAction: ((formData: FormData) => void | Promise<void>)) => async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    await serverAction(formData);

    noteStore.deselect();
  }

  return (
    <>
      <div className="w-full">
        <textarea cols={1} rows={5} value={noteText} onChange={e => setNoteText(e.target.value)}></textarea>
      </div>

      <div className="flex-row justify">
        <form onSubmit={handleSubmit(createOrUpdateNote)}>
          <input type="hidden" name="text" value={noteText} />
          <input type="hidden" name="id" value={noteStore.selectedNoteId || ''} />
          <button type="submit" disabled={noteText === ''}>Сохранить</button>
        </form>

        <form onSubmit={handleSubmit(deleteNote)}>
          <input type="hidden" name="id" value={noteStore.selectedNoteId || ''} />
          <button type="submit" disabled={noteStore.selectedNoteId === null}>Удалить</button>
      </form>
      </div>
    </>
  )
}

export default observer(Note)