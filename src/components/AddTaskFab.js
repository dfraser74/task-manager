import React from 'react';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import { FloatingActionButton } from 'src/utils/material-ui/index.js'
import ContentAdd from 'material-ui/svg-icons/content/add';


class AddTaskFab extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  render = () => (
    <FloatingActionButton onClick={this.onClickFab}>
      <ContentAdd />
    </FloatingActionButton>
  )

  onClickFab = (e) => {
    this.props.dispatch(push('/add'))
  }
}


export default AddTaskFab