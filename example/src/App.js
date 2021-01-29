import React from 'react'

import { ExampleComponent } from 'ith-components'
import { TreeNode } from 'ith-components'
import 'ith-components/dist/index.css'

function onLoadData() {
    return () => Promise.resolve([
        {
            title: 'hello',
            render: (title) => <span>title</span>
        }
    ])
}

const App = () => {
    return <>
        <ExampleComponent text="Create React"/>
        <TreeNode
            onTreeNodeInit={() => {}}
            onLoadData={onLoadData}
        />
        </>
}

export default App
