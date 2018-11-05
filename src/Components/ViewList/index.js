import React from 'react';
import Proptypes from 'prop-types';
import './viewList.css';

const populateList = list => list.filter(value => value.value !== '').map((value, i) => (<div>{i + 1}. {value.value}</div>));
class List extends React.Component {
  render() {
    return (
      <div className="List-container">
        <div className="List-selected">
          <div>Selected items</div>
          <div>{populateList(this.props.list.filter(entry => entry.status === 'selected'))}</div>
        </div>
        <div className="List-not-selected">
          <div>Unselected items</div>
          <div>{populateList(this.props.list.filter(entry => entry.status === 'notSelected'))}</div>
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
};
export default List;
