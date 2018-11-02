import React from 'react';
import AddItems from '../AddItem';
import List from '../ViewList';
import './container.css';

class Container extends React.Component {
  constructor() {
    super();
    this.state = {
      unSelectedItems: [],
      selectedItems: [],
    };
  }

  addNewItem(newItem) {
    const oldList = this.state.unSelectedItems;
    this.setState({
      unSelectedItems: oldList.concat(newItem),
    });
  }

  selectItem() {
    const list = this.state.unSelectedItems;
    const l = list.length();
    const i = Math.floor(Math.random() * l);
    this.setState({
      selectedItems: [...this.state.selectedItems, list[i]],
      unSelectedItems: list.splice(i),
    });
  }

  reset() {
    this.setState({
      unSelectedItems: [...this.state.selectedItems, this.state.unSelectedItems],
      selectedItems: [],
    });
  }

  render() {
    return (
      <div className="Container">
        <AddItems add={newItem => this.addNewItem(newItem)} reset={() => this.reset()} />
        <List selected={this.state.selectedItems} unSelected={this.state.unSelectedItems} />
      </div>
    );
  }
}

export default Container;
