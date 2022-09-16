import React, { useState } from 'react'

export const ImgHoverZoom = ({ ratio, src }) => {
  const [hover, setHover] = useState(false)

  const getStyle = () => {
    const defaultStyle = {
      transition: 'all .3s',
      width: '100%',
      height: '100%',
      cursor: 'pointer'
    }

    if (hover) {
      return {
        ...defaultStyle,
        width: `${ratio * 100}%`,
        height: `${ratio * 100}%`
      }
    }
    return defaultStyle
  }

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <img
        src={src}
        style={getStyle()}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      />
    </div>
  )
}
