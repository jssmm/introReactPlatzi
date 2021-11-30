import React, { useState } from 'react'

//Llamamos al localstorage
function useLocalStorage(itemName, initialValue) {
  //Es el estado inicial
  const [item, setItem] = useState(initialValue)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  React.useEffect(() => {
    try {
      setTimeout(() => {
        //Nos trae algun elemento
        const localStorageItem = localStorage.getItem(itemName)
        let parsedItem

        //Verificamos si ya existe el item
        if (!localStorageItem) {
          //Si no existe le mandamos un arreglo
          localStorage.setItem(itemName, JSON.stringify(initialValue))
          parsedItem = initialValue
        } else {
          //Si existe lo parseamos
          parsedItem = JSON.parse(localStorageItem)
        }

        setItem(parsedItem)
        setLoading(false)
      }, 1000)
    } catch (error) {
      setError(error)
    }
  }, [itemName, initialValue])

  const saveItem = (newItem) => {
    try {
      const stringifiedItem = JSON.stringify(newItem)
      localStorage.setItem(itemName, stringifiedItem)
      setItem(newItem)
    } catch (error) {
      setError(error)
    }
  }

  return { item, saveItem, loading, error }
}

export { useLocalStorage }
