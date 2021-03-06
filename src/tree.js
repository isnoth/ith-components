import React, { Component } from 'react'
import classNames from 'classnames'
import styled from 'styled-components'
import { ChevronRight } from 'react-feather'
import './tree.css'

export class TreeNode extends Component {
  state = {
    childNodes: [],
    expand: false,
    expandable: true
  }

  componentDidMount() {
    const { level, id, onTreeNodeInit } = this.props
    onTreeNodeInit({
      level,
      id,
      toggleExpand: this.toggleExpand,
      click: this.onClick
    })
  }

  toggleExpand = () => {
    // eslint-disable-next-line
    this.setState({ expand: !this.state.expand });
    const { level, onLoadData, title, id } = this.props
    return onLoadData(level, title, id).then((childNodes) => {
      // eslint-disable-next-line
      if (childNodes.length >0 ) {
        this.setState({ childNodes })
      } else {
        this.setState({ expandable: false })
      }
    })
  }

  onClick = () => {
    const {
      level,
      title,
      click,
      id,
      parentActiveLink,
      parentEnable,
      isNodeEnabled = () => true,
      parentId
    } = this.props
    const enabled = isNodeEnabled({ title, id, parentEnable, parentId })
    return click(
      level,
      title,
      id,
      parentActiveLink,
      enabled,
      this.state.expand,
      () => this.toggleExpand()
    )
  }

  getChildContainerStyle = () => {
    const { level } = this.props
    // console.log('getChildContainerStyle:', title, level)
    return { marginLeft: (level === 1 && '0px') || '1.5em' }
  }

  render() {
    const {
      level,
      onLoadData,
      title,
      click,
      expandable,
      activeLink,
      onTreeNodeInit,
      id,
      isNodeEnabled = () => true,
      parentEnable,
      parentId,
      renderer,
      className
    } = this.props
    const enabled = isNodeEnabled({ title, id, parentEnable, parentId })
    // console.log('isNodeEnabled:', enabled, title, id, isNodeEnabled({title, id}), isParentEnabled)
    return (
      <div className={classNames('node-wrapper', className)} id={id}>
        <div
          className={classNames({
            'node-content': true,
            'active-node': activeLink === title,
            'disabled-node': !enabled
          })}
        >
          {expandable && (
            <span
              className={classNames({
                'node-content__icon': true,
                'node-content__icon--expanded': this.state.expand
              })}
              style={{ cursor: 'pointer' }}
              onClick={this.toggleExpand}
            >
              <span>
                {' '}
                <ChevronRight size={14} />{' '}
              </span>
            </span>
          )}

          <span
            style={{ cursor: 'pointer' }}
            onClick={this.onClick}
            className={classNames({ 'node-content__text': true })}
          >
            {renderer && renderer(this.props)}
          </span>
        </div>
        {this.state.expand && (
          <div style={this.getChildContainerStyle()}>
            {this.state.childNodes.map((i) => (
              <TreeNode
                key={i.title}
                title={i.title}
                level={level + 1}
                id={i.id}
                onLoadData={onLoadData}
                click={click}
                expandable={!i.leaf}
                activeLink={activeLink}
                onTreeNodeInit={onTreeNodeInit}
                parentActiveLink={title}
                isNodeEnabled={isNodeEnabled}
                parentEnable={enabled}
                parentId={id}
                renderer={renderer}
              />
            ))}
          </div>
        )}
      </div>
    )
  }
}

export const TreeNodeStyled = styled(TreeNode)`
  .active-node {
    background-color: #bae7ff;
  }

  .disabled-node {
    color: #ccc;
    /* pointer-events: none; */
  }

  .node-wrapper {
    font-size: 1rem;
  }

  .node-content__icon > span > svg {
    transition: all 0.2s;
  }

  .node-content__icon--expanded > span > svg {
    transform: rotate(90deg);
  }

  .node-content {
    display: flex;
    margin-bottom: 0.8em;
  }
`
