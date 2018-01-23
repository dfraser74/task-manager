import React from 'react'
import PropTypes from 'prop-types'
import { Checkbox, ListItem } from 'src/utils/material-ui/index.js'
import Avatar from 'src/components/Avatar'
import LongPress from '../LongPress'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import SoundTaskComplete from './task-complete.wav'


class Task extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    done: PropTypes.bool,
    onComplete: PropTypes.func,
  }

  render() {
    let conditional = {}

    if (this.props.doneBy.length) {
      conditional.rightAvatar = (
        <div style={styles.avatarWrapper}>
          <Avatar size={30} name={this.props.doneBy[0].name} />
        </div>
      )
    }

    if (this.props.list) {
      conditional.style = {
        border: `${this.props.list.color} red 0px solid`,
        borderLeftWidth: '4px'
      }
    }

    if(this.props.done) {
      conditional.style = { textDecoration: 'line-through'}
    }

    // conditional.secondaryText = this.props.date;

    return (
      <LongPress onLongPress={this.onLongPressTask}>
        <ListItem
          primaryText={this.props.title}
          disabled={true}
          leftIcon={
            <Checkbox checked={this.props.done} onCheck={this.onClickCheckbox} disabled={!this.canCompleteTask()} />
          }
          { ...conditional }
        />
      </LongPress>
    )
  }

  onClickCheckbox = () => {
    if (this.props.done) return;
    if (!this.props.onComplete) return;
    this.props.onComplete(this.props.id);
    new Audio(SoundTaskComplete).play()
  }

  onLongPressTask = () => {
    this.props.dispatch(push("/task/" + this.props.id))
  }

  canCompleteTask() {
    if (!this.props.onComplete) return false;  
    return true
  }

  showAvatar = () => this.props.doneBy.length > 0

}

const styles = {
  avatarWrapper: {
    display: 'flex',
    flex: 1,
    bottom: '8px',
    alignItems: 'center'
  }
}

export default connect()(Task)