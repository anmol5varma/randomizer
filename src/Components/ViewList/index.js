import React from 'react';
import Proptypes from 'prop-types';
import './viewList.css';

const populateList = (list, toggle) => list.filter(value => value.value !== '')
  .map((value, i) => (
    <div onClick={() => toggle(value.id)}>
      {i + 1}. {value.value}
    </div>));
class List extends React.Component {
  constructor() {
    super();
    this.state = {
      selection: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.list.length === this.props.list.length) {
      const selectedItem = nextProps.list
        .filter((eachItem, i) => eachItem.status !== this.props.list[i].status);
      if (selectedItem.length > 0) {
        this.setState({
          selection: selectedItem[0].value,
        });
      }
    }
  }

  render() {
    return (
      <div className="List-container">
        <div>Selected Item is: {this.state.selection === '' ? 'Nothing selected' : this.state.selection}</div>
        <hr />
        <div className="List-selected">
          <div>Selected items</div>
          <div>{populateList(this.props.list.filter(entry => entry.status === 'selected'), this.props.toggle)}</div>
        </div>
        <div className="List-not-selected">
          <div>Unselected items</div>
          <div>{populateList(this.props.list.filter(entry => entry.status === 'notSelected'), this.props.toggle)}</div>
        </div>
      </div>
    );
  }
}

List.propTypes = {
  list: Proptypes.arrayOf({
    id: Proptypes.number.isRequired,
    value: Proptypes.string,
    status: Proptypes.string,
  }).isRequired,
  toggle: Proptypes.func.isRequired,
};
export default List;
