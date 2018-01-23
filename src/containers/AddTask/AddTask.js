import React from 'react'
import { AppBar, DatePicker, FlatButton, IconButton, TextField } from 'src/utils/material-ui/index.js'
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { goBack } from 'react-router-redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import TaskActions from 'src/actions/task'


class AddTask extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  state = {
    titleError: "",
  }

  render = () => (
    <div>
      <AppBar 
        title="Task"
        iconElementLeft={
          <IconButton onClick={this.onClickClose}><NavigationClose /></IconButton>
        }
        iconElementRight={<FlatButton label="Add" onClick={this.onClickAdd} />} />
      <div style={{ padding: '16px', paddingTop: '8px'}}>
        <TextField
          floatingLabelText="Title"
          onChange={this.validateTitle}
          errorText={this.state.titleError}
          fullWidth={true}
        />
        <DatePicker hintText="Date" fullWidth={true} onChange={this.onChangeDate} />
      </div>
    </div>
  )


  onClickClose = (e) => {
    this.props.dispatch(goBack())
    // this.props.dispatch(push('/'))
  }

  validateTitle = (event, value) => {
    this.title = value;
    let titleError = ("");

    if (this.title.length === 0)
      titleError = "Title is requiered"

    this.setState({ titleError })
  }
  
  onChangeDate = (event, value) => {
    this.date = value;
  }

  onClickAdd = (e) => {
    if(!this.formIsValid()) return;

    const task = {
      title: this.title,
      date: this.date,
    };
    this.props.actions.addTask(task);
    this.onClickClose(e);
  }

  formIsValid() {
    if(!this.title){
      this.validateTitle(null, "");
      return false
    }
    return this.state.titleError === "";
  }

}

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  actions: bindActionCreators({
    addTask: TaskActions.addTask,
  }, dispatch)
})

export default connect(null, mapDispatchToProps)(AddTask);
