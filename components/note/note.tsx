"use client";

import { createNote } from '@/lib/actions';
import React, { useState } from 'react'

const Note = () => {
  const [note, setNote] = useState('');

  return (
    <form action={createNote}>
      <div>
        <textarea value={note} onChange={e => setNote(e.target.value)} name="note"/>
      </div>
      <div>
        <button disabled={note === ''} type="submit">Сохранить</button>
      </div>
    </form>
  )
}

export default Note