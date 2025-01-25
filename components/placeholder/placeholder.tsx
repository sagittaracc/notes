import React, { FC } from 'react'
import styles from './placeholder.module.scss';

type TPlaceholderProps = {
  text: string
}

const Placeholder: FC<TPlaceholderProps> = ({ text }) => {
  return (
    <div className={styles.placeholder}>
      <span>{text}</span>
    </div>
  )
}

export default Placeholder