"use client";

import React, { FC } from 'react'

type TNoteItemProps = {
  id: number
  text: string
}

const NoteItem: FC<TNoteItemProps> = ({ id, text }) => {
  return (
    <p onClick={() => console.log(id)}>{text}</p>
  )
}

export default NoteItem