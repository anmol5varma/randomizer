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
    if (newList[newList.length - 1].value !== '') {
      newList.push({ id: count, value: '', status: notSelected });
      count += 1;
    }
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

  clearAll() {
    this.setState({
      allItems: [],
    }, () => {
      count = 0;
    });
  }

  selectItem() {
    let list = this.state.allItems;
    const newList = list.filter(eachItem => eachItem.status === notSelected && eachItem.value !== '');
    if (newList.length > 0) {
      const i = Math.floor(Math.random() * newList.length);
      const selectedItem = newList[i];
      list = list.map((eachItem) => {
        if (eachItem.id === selectedItem.id) {
          return { ...eachItem, status: selected };
        }
        return eachItem;
      });
      this.setState({
        allItems: list,
      });
    }
  }

  render() {
    return (
      <div className="Container">
        <AddItems
          add={newItem => this.addNewItem(newItem)}
          edit={(newValue, i) => this.editItem(newValue, i)}
          remove={i => this.removeItem(i)}
          reset={() => this.reset()}
          clear={() => this.clearAll()}
          select={() => this.selectItem()}
          list={this.state.allItems}
        />
        <List list={this.state.allItems} select={() => this.selectItem()} />
      </div>
    );
  }
}

export default Container;
