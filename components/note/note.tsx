"use client";

import { createOrUpdateNote } from '@/lib/actions';
import React from 'react'

const Note = () => {
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

export default Note