import React, { useState } from 'react'
import { List, Input, Checkbox, Button, Radio } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import 'antd/dist/antd.css';
import './ListComponent.css';

export default function ListComponent() {
  const [todos, setTodos] = useState([
    {name: 'Тестовое задание', isChecked: false},
    {name: 'Прекрасный код', isChecked: false},
    {name: 'Покрытие тестами', isChecked: false},
  ]);
  const [leftTaskToDo, setLeftTasks] = useState(todos.length);
  const [status, setStatus] = useState('All');

  const addNewToDo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(e);
    setTodos([...todos, {name: e.currentTarget.value, isChecked: false}]);
    setLeftTasks(leftTaskToDo + 1);
  }

  const isCheckedChange = (item: {name: string; isChecked: boolean}) => {
    const newTodo = todos.map(dataItem => {
      if (dataItem === item) {
        return {name: item.name, isChecked: !item.isChecked}
      }
      return dataItem;
    });
    setTodos(newTodo);
    setLeftTasks(newTodo.filter(dataItem => (dataItem.isChecked === false)).length);
  }

  const getListItems = () => {
    let filteredTodosList = todos;
    if (status === 'Active') {
      filteredTodosList = todos.filter(dataItem => (dataItem.isChecked === false))
    } else if (status === 'Completed') {
      filteredTodosList = todos.filter(dataItem => (dataItem.isChecked === true));
    }

    return filteredTodosList.map(dataItem => (
      console.log(dataItem),
      <div className='todoItem'>
        <Checkbox className='todoItemCheckbox' checked={dataItem.isChecked} onClick={() => isCheckedChange(dataItem)}/>
        <span style={dataItem.isChecked ? {textDecoration: 'line-through', color: 'lightgrey'} : {}}>
          {dataItem.name}
        </span>
      </div>
    ))
  }

  const clearCompleted = () => {
    setTodos(todos.filter(dataItem => (dataItem.isChecked !== true)));
  }

  return (
    <List
      size="large"
      header={
        <div className='todoHeader'>
          <DownOutlined />
          <Input onPressEnter={(e: React.KeyboardEvent<HTMLInputElement>) => addNewToDo(e)} placeholder='What needs to be done?'/>
        </div>
      }
      footer={
        <div className='todoFooter'>
          <div>{leftTaskToDo} items left</div>
          <Radio.Group defaultValue='All' onChange={(e) => setStatus(e.target.value)}>
            <Radio.Button value="All">All</Radio.Button>
            <Radio.Button value="Active">Active</Radio.Button>
            <Radio.Button value="Completed">Completed</Radio.Button>
          </Radio.Group>
          <Button type='text' onClick={clearCompleted}>Clear complited</Button>
        </div>
      }
      bordered
      dataSource={getListItems()}
      renderItem={(item) => <List.Item>{item}</List.Item>}
    />
  )
};


