import React, { useState, useRef } from 'react'
// let timer = null

export const ImgHoverZoom = ({
  ratio,
  src,
  fallbackSrc,
  width,
  height,
  debug,
  delay = 500
}) => {
  const [hover, setHover] = useState(false)
  const [animated, setAnimated] = useState('idle')
  const [timer, setTimer] = useState(null)
  const ref = useRef()
  const containerRef = useRef()

  const onHover = () => {
    console.log('onEnter', timer)
    setHover(true)
    setAnimated('enter')
    if (timer) {
      console.log('onEnter clearTimeout')
      clearTimeout(timer)
      setTimer(null)
    }
  }

  const onLeave = () => {
    console.log('onLeave')
    setAnimated('leave')
    setHover(false)
    if (timer) {
      clearTimeout(timer)
      setTimer(null)
    }

    const t = setTimeout(() => {
      setAnimated('idle')
    }, delay)
    setTimer(t)
  }

  const getStyle = () => {
    const defaultStyle = {
      transition: `all ${delay / 1000}s`,
      maxWidth: '100%',
      maxHeight: '100%',
      cursor: 'pointer',
      margin: 'auto',
      transformOrigin: `left center`
    }

    if (hover) {
      return {
        ...defaultStyle,
        // width: `${ratio * 100}%`
        // height: `${ratio * 100}%`,
        transform: `scale(${ratio})`,
        // position: 'absolute',
        // left: ref.current.offsetLeft,
        zIndex: 9999
        // position: 'fixed',
        // maxWidth,
        // height
      }
    }
    return defaultStyle
  }

  const getContainerStyle = () => {
    const ZINDEX = {
      idle: 'unset',
      enter: 9999,
      leave: 9998
    }

    const defaultStyle = {
      width,
      height,
      position: 'absolute',
      left: 'unset',
      top: 'unset',
      zIndex: ZINDEX[animated],
      display: 'flex',
      aliginItems: 'center',
      justifyContent: 'center'
    }

    if (animated !== 'idle') {
      return {
        ...defaultStyle,
        position: 'fixed',
        left: containerRef.current.getBoundingClientRect().x,
        top: containerRef.current.getBoundingClientRect().y
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
      <div ref={containerRef} style={getContainerStyle()}>
        <img
          ref={ref}
          src={src}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null // prevents looping
            currentTarget.src = fallbackSrc
          }}
          style={getStyle()}
          onMouseEnter={onHover}
          onMouseLeave={onLeave}
        />
      </div>

      {debug && (
        <div style={{ display: 'flex', position: 'absolute', zIndex: 9999 }}>
          <div style={{ marginRight: '1em' }}>
            {animated ? 'true' : 'false'}
          </div>
          <div>{hover ? 'true' : 'false'}</div>
        </div>
      )}
    </div>
  )
}
