import React from 'react'
import { Avatar as MaterialAvatar } from 'src/utils/material-ui/index.js'

const Avatar = (props) => {
  if (!props.image) return (
    <MaterialAvatar {...props}>
      {props.name.substring(0, 1).toUpperCase()}
    </MaterialAvatar>
    )
  return (
    <MaterialAvatar src={props.image} {...props} />
  )
}

export default Avatar;