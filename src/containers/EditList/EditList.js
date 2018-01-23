import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import ListActions from '../../actions/list'
import AddList from '../AddList/AddList'
import { getListById } from '../../reducers/lists';


class EditList extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  render = () => (
    <AddList edit={true} list={this.props.list}/>
  )

}

const mapStateToProps = (state, ownProps) => ({
  list: getListById(state, ownProps.match.params.id),
});


const mapDispatchToProps = (dispatch) => ({
  dispatch,
  actions: bindActionCreators({
    addList: ListActions.addList,
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(EditList);
