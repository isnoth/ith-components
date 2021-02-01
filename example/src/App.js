import React from 'react'

import { ExampleComponent } from 'ith-components'
import { TreeNode } from 'ith-components'
import 'ith-components/dist/index.css'

function onLoadData() {
    return Promise.resolve([
        {
            title: 'hello',
            render: (title) => <span>title</span>
        }
    ])
}

//需要调一遍toggle expand 才能用
//
const App = () => {
    return <>
        <ExampleComponent text="Create React"/>
        <TreeNode
            onTreeNodeInit={() => {}}
            title="root"
            onLoadData={onLoadData}
            renderer={({title}) => <span>{title}</span>}
            click={(level, title, id, parentActiveLink, enabled, expanded, toggleExpand) => {console.log('click', toggleExpand); toggleExpand()}}
        />
        </>
}

export default App
