import React, { FC } from 'react'
import styles from './placeholder.module.scss';

type TPlaceholderProps = {
  text: string
  width?: string | number
  height?: string | number
}

const Placeholder: FC<TPlaceholderProps> = ({ text, width = '100%', height = '100%' }) => {
  return (
    <div className={styles.placeholder} style={{width, height}}>
      <span>{text}</span>
    </div>
  )
}

export default Placeholder