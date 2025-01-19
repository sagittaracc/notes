"use client";

import { createOrUpdateNote } from '@/lib/actions';
import React from 'react'
import { observer } from 'mobx-react';
import noteStore from '../../store';

const Note = () => {
  console.log("BLAH", noteStore.selectedNoteId, noteStore.selectedNoteText)
  return (
    <form action={createOrUpdateNote}>
      <div>
        <textarea name="note"/>
      </div>
      <div>
        <button type="submit">Сохранить</button>
      </div>
    </form>
  )
}

export default observer(Note)