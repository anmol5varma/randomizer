import React from 'react';
import Proptypes from 'prop-types';
import './eachItem.css';

class EachItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.item.value,
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.item.value,
    });
  }
  render() {
    return (
      <div className="Each-item">
        <input
          value={this.state.value}
          onChange={event => this.setState({ value: event.target.value })}
          autoFocus  // eslint-disable-line
        />
        <button onClick={() => this.props.edit(this.state.value, this.props.item.id)}>save</button>
        <button onClick={() => this.props.remove(this.props.item.id)}>delete</button>
      </div>
    );
  }
}

EachItem.propTypes = {
  remove: Proptypes.func.isRequired,
  edit: Proptypes.func.isRequired,
  item: Proptypes.shape({
    id: Proptypes.number.isRequired,
    value: Proptypes.string,
    status: Proptypes.string,
  }).isRequired,
};

export default EachItem;
