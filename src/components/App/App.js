import React, { useState } from 'react'
import { TodoCounter } from '../TodoCounter/TodoCounter'
import { TodoSearch } from '../TodoSearch/TodoSearch'
import { TodoList } from '../TodoList/TodoList'
import { TodoItem } from '../TodoItem/TodoItem'
import { CreateTodoButton } from '../CreateTodoButton/CreateTodoButton'
import './App.css'

// const defaultTodos = [
//   { text: 'Cortar cebolla', completed: true },
//   { text: 'Tomar el cursso de intro a React', completed: false },
//   { text: 'Llorar con la llorona', completed: false },
//   { text: 'LALALALAA', completed: false },
// ]

function App() {
  const localStorageTodos = localStorage.getItem('TODOS_V1')
  let parsedTodos
  if (!localStorageTodos) {
    localStorage.setItem('TODOS_V1', JSON.stringify([]))
    parsedTodos = []
  } else {
    parsedTodos = JSON.parse(localStorageTodos)
  }
  const [searchValue, setSearchValue] = useState('')
  const [todos, setTodos] = useState(parsedTodos)

  //Cantidad de todos marcados como completados
  const completedTodos = todos.filter((todo) => todo.completed === true).length
  const totalTodos = todos.length

  let searchedTodos = []

  //Esta validacion revisa los todos existentes, cuando el usuario digita en el input, se hace una busqueda
  if (searchValue.length < 1) {
    searchedTodos = todos
  } else {
    searchedTodos = todos.filter((todo) => {
      const todoText = todo.text.toLowerCase()
      const searchText = searchValue.toLowerCase()
      return todoText.includes(searchText)
    })
  }

  const saveTodos = (newTodos) => {
    const stringifiedTodos = JSON.stringify(newTodos)
    localStorage.setItem('TODOS_V1', stringifiedTodos)
    setTodos(newTodos)
  }

  const completeTodo = (text) => {
    //Cada vez que reciba un texto va a buscar cual todo cumple con esa condicion
    const todoIndex = todos.findIndex((todo) => todo.text === text)
    //Clonamos los todos
    const newTodos = [...todos]
    //Marcamos a ese todo como caso contrario a lo que tenga
    newTodos[todoIndex].completed = !newTodos[todoIndex].completed
    //Actualizamos el estado para re-renderizar
    saveTodos(newTodos)
  }

  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex((todo) => todo.text === text)
    const newTodos = [...todos]
    newTodos.splice(todoIndex, 1)
    saveTodos(newTodos)
  }

  return (
    <React.Fragment>
      <TodoCounter total={totalTodos} completed={completedTodos} />
      <TodoSearch searchValue={searchValue} setSearchValue={setSearchValue} />

      <TodoList>
        {searchedTodos.map((todo) => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            onComplete={() => completeTodo(todo.text)}
            onDelete={() => deleteTodo(todo.text)}
          />
        ))}
      </TodoList>

      <CreateTodoButton />
    </React.Fragment>
  )
}

export default App
