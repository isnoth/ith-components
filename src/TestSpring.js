import React, { useState } from 'react'
import { useSpring, animated } from 'react-spring'

export const TestSpring = ({ toggle, ratio, src, width, height, debug }) => {
  // const styles = useSpring({ opacity: toggle ? 1 : 0 })
  const styles = useSpring({
    scale: toggle ? 1.8 : 1,
    position: toggle ? 'fixed' : 'absolute',
    display: 'inline-block'
  })

  const [hover, setHover] = useState(false)

  const styles2 = useSpring({
    scale: hover ? 1.8 : 1,
    position: hover ? 'fixed' : 'absolute',
    maxWidth: width,
    maxHeight: height,
    cursor: 'pointer',
    margin: 'auto',
    transformOrigin: `left bottom`,
    zIndex: 9999
  })

  return (
    <div>
      <animated.div style={styles}>i will fade</animated.div>

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
          <animated.img
            src={src}
            style={styles2}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          />
        </div>
      </div>
    </div>
  )
}
