import React from 'react'
import { AppBar, FlatButton, IconButton, TextField } from 'src/utils/material-ui/index.js'
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { goBack } from 'react-router-redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as colors from 'material-ui/styles/colors';
import DoneIcon from 'material-ui/svg-icons/action/done';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import NavigationCheck from 'material-ui/svg-icons/navigation/check';

import './addList.sass'
import ListActions from '../../actions/list'


class AddList extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  listColors = [
    colors.red600,
    colors.deepPurple500,
    colors.indigo500,
    colors.pink500,
    colors.blue500,
    colors.teal500,
    colors.green500,
    colors.amber700,
    colors.deepOrange500,
    colors.brown500,
    colors.blueGrey500,
    colors.grey500,
  ]

  constructor(props) {
    super(props);
    this.state = {
      selectedColor: null,
      nameError: "",
    }

    if (this.props.edit) {
      this.name = this.props.list.name;
      this.state.selectedColor = this.props.list.color;
    }
  }

  render = () => (
    <div>
      <AppBar
        title="List"
        iconElementLeft={
          <IconButton onClick={this.onClickClose}><NavigationClose /></IconButton>
        }
        iconElementRight={this.getIconElementRight()} />
      <div style={{ padding: '16px', paddingTop: '8px' }}>
        <TextField
          floatingLabelText="Name"
          fullWidth={true}
          defaultValue={this.name}
          onChange={this.onChangeName}
          errorText={this.state.nameError}
        />
      </div>
      <p className="color-title">Color</p>
      <div className="list-colors">
        {this.listColors.map(color => (
          <Color
            color={color}
            key={color}
            selected={color === this.state.selectedColor}
            onPressColor={this.onPressColor} />
        ))}
      </div>
    </div>
  )

  getIconElementRight() {
    if (this.props.edit) {
      return (
        <IconButton onClick={this.onClickSendEdit}><NavigationCheck /></IconButton>
      )
    }
    return <FlatButton label="Add" onClick={this.onCLickAdd} />
  }

  onPressColor = (color) => {
    if (color === this.state.selectedColor) {
      return this.setState({ selectedColor: null})
    }
    this.setState({ selectedColor: color })
  }

  onClickSendEdit = () => {
    if (!this.formIsValid()) return;

    this.props.actions.update({
      ...this.props.list,
      name: this.name,
      color: this.state.selectedColor,
    })
    this.onClickClose()
  }

  onChangeName = (event, value) => {
    this.name = value;
    let nameError = ("");

    if (this.name.length === 0)
      nameError = "List name is requiered"

    this.setState({ nameError })
  }

  onClickClose = () => {
    this.props.dispatch(goBack())
  }

  onCLickAdd = (e) => {
    if (!this.formIsValid()) return;

    this.props.actions.addList({
      name: this.name,
      color: this.state.selectedColor,
      user: this.props.userId,
    })
    this.onClickClose()
  }

  formIsValid() {
    if (!this.name) {
      this.onChangeName(null, "")
      return false;
    }
    return this.state.nameError === "";
  }

}

const Color = ({ color, selected, onPressColor }) => (
  <div
    className={classNames({ "list-colors__color": true, "list-colors__color--selected": selected, })}
    style={{ backgroundColor: color }}
    onClick={() => onPressColor(color)}
  >
    {selected && (
      <div className="list-colors__selected">
        <DoneIcon color="blue" />
      </div>
    )}
  </div>
)

const mapStateToProps = (state) => ({
  userId: state.user.id,
})


const mapDispatchToProps = (dispatch) => ({
  dispatch,
  actions: bindActionCreators({
    addList: ListActions.addList,
    update: ListActions.update,
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AddList);
