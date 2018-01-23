import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import { push, replace } from 'react-router-redux'

import { IconButton, Dialog, FlatButton } from 'src/utils/material-ui/index.js'
import { AddTaskFab, Task } from '../../components';
import TaskActions from '../../actions/task';
import ListActions from '../../actions/list';
import { getByList } from '../../reducers/tasks';
import { getListById } from '../../reducers/lists';
import EmptyTasks from 'src/components/EmptyTasks/EmptyTasks';


class List extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  state = {
    dialogOpen: false,
  }

  componentWillUnmount() {
    this.props.setIconElementRight(null);
    this.props.setBackgroundColor(null);    
  }
  
  render = () => {
    this.props.setAppbarTitle(this.props.list.name);
    this.props.setBackgroundColor(this.props.list.color);
    this.props.setIconElementRight((
      <div>
        <IconButton onClick={this.onClickDelete}><DeleteIcon color="#fff" /></IconButton>
        <IconButton onClick={this.onClickEdit}><EditIcon color="#fff" /></IconButton>
      </div>
    ));

    return (
      <div>
        {this.props.tasks.map(task => (
          <Task
            key={task.id}
            onComplete={this.props.actions.complete}
            {...task} />
        ))}

        {this.props.tasks.length === 0 && (
          <EmptyTasks />
        )}

        {this.renderDialog()}
      </div>
    );
  }

  renderDialog() {
    const actions = [
      <FlatButton
        label="Cancel"
        onClick={this.closeDialog}
      />,
      <FlatButton
        label="Delete"
        onClick={this.deleteList}
      />,
    ];

    return (
      <Dialog
        title="Delete list"
        modal={false}
        actions={actions}
        open={this.state.dialogOpen}
        onRequestClose={this.closeDialog}
      >
        Are you sure you want to delete this list forever?
      </Dialog>
    )
  }

  onClickEdit = () => {
    this.props.dispatch(push(`/list/${this.props.list.id}/edit`))
  }

  onClickDelete = () => this.setState({ dialogOpen: true })

  closeDialog = () => this.setState({ dialogOpen: false })

  deleteList = () => {
    this.closeDialog();
    setTimeout(() => {
      this.props.dispatch(replace('/'));
      this.props.actions.deleteList(this.props.list.id)
    }, 400)
  }

}


const mapStateToProps = (state, ownProps) => ({
  tasks: getByList(state, ownProps.match.params.id),
  list: getListById(state, ownProps.match.params.id),
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  actions: bindActionCreators({
    complete: TaskActions.complete,
    deleteList: ListActions.deleteList,
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(List);