import React, { useEffect, useState } from 'react'
import './wxLogin'

export const WechatQr = ({
  cb,
  state,
  styles,
  listener
}: {
  cb: string,
  state: string,
  styles: string,
  listener: any
}) => {
  const watcher = (msgEvt) => {
    const msg = msgEvt.data
    listener(msg)
  }

  const [id] = useState(Math.random().toString())

  useEffect(() => {
    window.addEventListener('message', watcher)
    return () => {
      window.removeEventListener('message', watcher)
    }
  }, [])

  useEffect(() => {
    /* eslint-disable-next-line */
    const obj = new WxLogin({
      self_redirect: true,
      id: id,
      appid: 'wxe5575595fec4072a',
      scope: 'snsapi_login',
      redirect_uri: cb,
      state,
      style: '.impowerBox .title {display: none;}',
      href:
        (styles &&
          `data:text/css;base64,${window.btoa(
            unescape(encodeURIComponent(styles))
          )}`) ||
        ''
    })
  }, [])

  return (
    <div
      id={id}
      className='tw-text-center'
      style={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}
    >
      {' '}
      Wechat QR{' '}
    </div>
  )
}
