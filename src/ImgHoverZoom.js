import React, { useState, useRef } from 'react'

export const ImgHoverZoom = ({ ratio, src, width, height, debug }) => {
  const [hover, setHover] = useState(false)
  const ref = useRef()

  const getStyle = () => {
    const defaultStyle = {
      transition: 'all .3s',
      maxWidth: '100%',
      maxHeight: '100%',
      cursor: 'pointer',
      margin: 'auto',
      transformOrigin: `left center`
    }

    if (hover) {
      console.log(ref.current)
      return {
        ...defaultStyle,
        // width: `${ratio * 100}%`
        // height: `${ratio * 100}%`,
        transform: `scale(${ratio})`,
        // position: 'absolute',
        // left: ref.current.offsetLeft,
        top: 0,
        zIndex: 9999
      }
    }
    return defaultStyle
  }

  return (
    <div
      style={{
        width,
        height,
        position: 'relative',
        border: debug ? 'solid 1px red' : 'none',
        background: debug ? 'gray' : 'none'
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          display: 'flex',
          aliginItems: 'center',
          justifyContent: 'center'
        }}
      >
        <img
          ref={ref}
          src={src}
          style={getStyle()}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        />
      </div>
    </div>
  )
}
