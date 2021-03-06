import React from 'react'
import { ExampleComponent } from 'ith-components'
import { TreeNodeStyled } from 'ith-components'
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
const App = () => {
    return <>
        <ExampleComponent text="Create React"/>
        <TreeNodeStyled
            onTreeNodeInit={() => {}}
            title="root"
            expandable={true}
            onLoadData={onLoadData}
            renderer={({title}) => <span>{title}</span>}
            click={click}
        />
        </>
}

export default App
