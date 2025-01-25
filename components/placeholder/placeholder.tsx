import React, { FC } from 'react'
import styles from './placeholder.module.scss';

type TPlaceholderProps = {
  text: string
}

const Placeholder: FC<TPlaceholderProps> = ({ text }) => {
  return (
    <div className={`${styles.placeholder} m-3`}>
      <div>{text}</div>
    </div>
  )
}

export default Placeholder