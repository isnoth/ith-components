import React, { useState} from 'react'
import { ExampleComponent } from 'ith-components'
import { TreeNodeStyled } from 'ith-components'
import { WechatQr } from 'ith-components'
import { ImgHoverZoom } from 'ith-components'
import 'ith-components/dist/index.css'

function onLoadData() {
    return Promise.resolve([
        {
            title: 'hello',
            render: (title) => <span>{title}</span>
        },
        {
             title: 'world',
            render: (title) => <span>{title}</span>
        }
    ])
}

function click(level, title, id, parentActiveLink, enabled, expanded, toggleExpand) {
    console.log('click', toggleExpand)
    toggleExpand()
}

//需要调一遍toggle expand 才能用
//
//
//

const WechatQrDemo = () => {
    const[user, setUser] = useState({})
    const listener = (msg) => {
        if (msg.type === 'wx-info2')  {
            console.log(msg.user)
            setUser(msg.user)
        }
    }

    return <div>
        <p>Wechat Qr Demos</p>
        <div style={{display:'flex'}}>
            <div>
                <WechatQr
                    cb={"http://www.damaishuju.com/wpi-test/wxInfo2Cb"}
                    state={window.btoa(unescape(encodeURIComponent(JSON.stringify({site:'ml'}))))}
                    listener={listener}
                />
            </div>

            <div>
                <h3> needPayType: true</h3>
                <WechatQr
                    cb={"http://www.damaishuju.com/wpi-test/wxInfo2Cb"}
                    state={window.btoa(unescape(encodeURIComponent(JSON.stringify({site:'ml', needPayType: true}))))}
                    listener={listener}
                />
            </div>
            <div>
                <pre>{JSON.stringify(user, null, 2)}</pre>
            </div>
        </div>
    </div>
}

const App = () => {
    return <>
        <ExampleComponent text="Create React"/>

        <div style={{width: '80px', height: '80px'}}>
            <ImgHoverZoom ratio={1.8} src={'https://thumbnail10.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/355306515057791-69466558-beb0-45ad-a7a0-fd9db43bdc90.jpg'}/>
        </div>
        <TreeNodeStyled
            onTreeNodeInit={() => {}}
            title="root"
            expandable={true}
            onLoadData={onLoadData}
            renderer={({title}) => <span>{title}</span>}
            click={click}
        />

        <hr/>
        <WechatQrDemo/>
        </>
}

export default App
