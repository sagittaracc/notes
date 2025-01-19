"use client";

import { createNote } from '@/lib/actions';
import React, { useState } from 'react'

const Note = () => {
  return (
    <form action={createNote}>
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