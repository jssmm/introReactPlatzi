import React, { createContext, useState } from 'react'
import { useLocalStorage } from './useLocalStorage'

const TodoContext = createContext()

function TodoProvider(props) {
  const {
    item: todos,
    saveItem: saveTodos,
    loading,
    error,
  } = useLocalStorage('TODOS_V1', [])

  const [searchValue, setSearchValue] = useState('')

  const [openModal, setOpenModal] = useState(false)

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

  const addTodo = (text) => {
    const newTodos = [...todos]
    newTodos.push({
      completed: false,
      text,
    })
    saveTodos(newTodos)
  }
  return (
    <TodoContext.Provider
      value={{
        loading,
        error,
        totalTodos,
        completedTodos,
        searchValue,
        setSearchValue,
        searchedTodos,
        completeTodo,
        deleteTodo,
        addTodo,
        openModal,
        setOpenModal,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  )
}

export { TodoContext, TodoProvider }
