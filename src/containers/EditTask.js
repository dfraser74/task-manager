import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import {
  AppBar, DatePicker, FlatButton, Checkbox, IconButton, TextField, MenuItem, DropDownMenu, ListItem, Subheader
} from 'src/utils/material-ui/index.js'
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import NavigationCheck from 'material-ui/svg-icons/navigation/check';
import { goBack } from 'react-router-redux';

import TaskActions from 'src/actions/task'
import Avatar from 'src/components/Avatar'


class EditTask extends React.Component {
  static contextTypes = {
    muiTheme: PropTypes.object,
  }

  state = {
    titleError: "",
    list: this.props.task.list || 0,
    title: this.props.task.title,
    done: this.props.task.done,
    date: this.props.task.date,
    taskChange: false,
  }

  render = () => {
    const coditionalProps = {}
    if (this.state.taskChange) {
      coditionalProps.iconElementRight = (
        <IconButton onClick={this.onClickCheck}><NavigationCheck /></IconButton>
      )
    }

    return (
      <div>
        <AppBar
          iconElementLeft={
            <IconButton onClick={this.onClickClose}><NavigationClose /></IconButton>
          }
          zDepth={0}
          {...coditionalProps} />
        <div style={{ padding: '16px', paddingTop: '40px', backgroundColor: this.context.muiTheme.baseTheme.palette.primary1Color }}>
          <TextField
            onChange={this.validateTitle}
            errorText={this.state.titleError}
            fullWidth={true}
            inputStyle={{ color: '#fff', fontSize: '26px' }}
            value={this.state.title}
            floatingLabelStyle={{ color: '#fff' }}
          />
        </div>
        <div style={{ padding: '16px' }}>
          <DatePicker hintText="Date" fullWidth={true} onChange={this.onChangeDate} />
        </div>
        <DropDownMenu value={this.state.list} onChange={this.handleChange}>
          <MenuItem value={0} primaryText="Without list" />
          {Object.values(this.props.lists).map(list => (
            <MenuItem value={list.id} primaryText={list.name} key={list.id} />
          ))}
        </DropDownMenu>
        <ListItem
          leftCheckbox={
            <Checkbox checked={this.state.done} onCheck={this.onClickDone} />
          }
          primaryText="Done"
        />
        {/* <ListItem 
          primaryText="Shared with"
          primaryTogglesNestedList={true}
          nestedItems={
            this.props.task.sharedWith.map(u => (
              <ListItem
                primaryText={u.name}
                leftAvatar={<Avatar name={u.name} image={u.image} />}
                rightIcon={<NavigationClose onClick={this.removeShareWith.bind(this, u.id)} />}
                key={u.id}
                disabled={true}
              />
            ))
          } />

        <FlatButton
          label="Add Shared With"
          // icon={<FontIcon className="muidocs-icon-custom-github" />}
          /> */}

      </div>
    )
  }
  handleChange = (event, index, value) => {
    this.setState({ list: value });
    this.taskHasChange();
  }

  validateTitle = (event, value) => {
    this.setState({ title: value });
    this.taskHasChange();
  }

  onClickClose = () => this.props.dispatch(goBack());

  onClickDone = (event, value) => {
    this.setState({ done: value });
    this.taskHasChange();
  }

  taskHasChange = () => {
    this.setState({ taskChange: true })
  }

  onClickCheck = () => {
    this.props.actions.updateTask({
      id: this.props.task.id,
      title: this.state.title,
      done: this.state.done,
      date: this.state.date,
      list: this.state.list,
    });

    this.props.dispatch(goBack());
  }

  removeShareWith = (userId) => {
    this.props.actions.removeShareWith({
      taskId: this.props.task.id,
      userId
    })
  }

}



const mapStateToProps = (state, ownProps) => ({
  lists: state.lists,
  task: state.tasks[ownProps.match.params.id]
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  actions: bindActionCreators({
    updateTask: TaskActions.update,
    removeShareWith: TaskActions.removeShareWith,
  }, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(EditTask)