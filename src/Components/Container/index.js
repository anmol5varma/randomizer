import React from 'react';
import AddItems from '../AddItem';
import List from '../ViewList';
import './container.css';

const selected = 'selected';
const notSelected = 'notSelected';
let count = 1;
class Container extends React.Component {
  constructor() {
    super();
    this.state = {
      allItems: [],
    };
  }

  addNewItem(newItem) {
    const newList = this.state.allItems.concat({ id: count, value: newItem, status: notSelected });
    this.setState({
      allItems: newList,
    }, () => { count += 1; });
  }

  removeItem(id) {
    const newList = this.state.allItems.filter(eachItem => eachItem.id !== id);
    this.setState({
      allItems: newList,
    });
  }

  editItem(newValue, id) {
    const newList = this.state.allItems.map((eachItem) => {
      if (eachItem.id === id) {
        return { ...eachItem, value: newValue };
      }
      return eachItem;
    });
    this.setState({
      allItems: newList,
    });
  }

  reset() {
    const newList = this.state.allItems.map(eachItem => ({ ...eachItem, status: notSelected }));
    this.setState({
      allItems: newList,
    });
  }

  selectItem() {
    let list = this.state.allItems;
    const l = list.filter(eachItem => eachItem.status === notSelected).length();
    const i = Math.floor(Math.random() * l);
    const selectedItem = list[i];
    list = list.map((eachItem) => {
      if (eachItem.id === selectedItem.id) {
        return { ...eachItem, status: selected };
      }
      return eachItem;
    });
    this.setState({
      allItems: list,
    });
    return i;
  }

  render() {
    return (
      <div className="Container">
        <AddItems
          add={newItem => this.addNewItem(newItem)}
          edit={(newValue, i) => this.editItem(newValue, i)}
          delete={i => this.removeItem(i)}
          reset={() => this.reset()}
        />
        <List list={this.state.allItems} select={() => this.selectItem()} />
      </div>
    );
  }
}

export default Container;
