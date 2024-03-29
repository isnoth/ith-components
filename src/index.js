import React from 'react'
import styles from './styles.module.css'

export const ExampleComponent = ({ text }) => {
  return <div className={styles.test}>Example Component: {text}</div>
}

export * from './tree'
export * from './wx-qr/wx-qr'
export * from './ImgHoverZoom'
export * from './TestSpring'
