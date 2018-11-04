import React from 'react';
import Proptypes from 'prop-types';
import Item from '../EachItem';
import './addItem.css';

class AddItems extends React.Component {
  addToValue(index, val) {
    const newValue = this.state.value;
    newValue[index] = val;
    this.setState({
      value: newValue,
    });
  }

  render() {
    const {
      add, edit, remove, list, reset,
    } = this.props;
    return (
      <div className="Items-container">
        <div><button onClick={() => add('')}>+</button>
          <button onClick={() => reset()}>Reset</button>
        </div>
        {list
          .map(eachItem => (<Item
            item={eachItem}
            edit={(val, id) => edit(val, id)}
            remove={id => remove(id)}
          />))}
      </div>
    );
  }
}
AddItems.propTypes = {
  add: Proptypes.func.isRequired,
  remove: Proptypes.func.isRequired,
  edit: Proptypes.func.isRequired,
  reset: Proptypes.func.isRequired,
  list: Proptypes.arrayOf({
    id: Proptypes.number.isRequired,
    value: Proptypes.string,
    status: Proptypes.string,
  }),
};

AddItems.defaultProps = {
  list: [],
};

export default AddItems;
