import { useEffect, useState } from 'react'
import { cloneDeep } from 'lodash'

/**
 * @param {Array} dataSource - The initial list of items
 * @param {Object} options - The options for the hook
 * @param {'normal' | 'reverse'} options.sorting - The sorting type for the list of items
 * Allows to make CRUD operations over a list of items at "state" level.
 * You can add, remove, update and get the items in the list
 */
export function useDynamicList (dataSource, { sorting = 'normal' } = {}) {
  const [items, setItems] = useState(dataSource ?? [])

  useEffect(() => { // keep the items in sync with the latest version of the datasource
    setItems(dataSource || [])
  }, [dataSource])

  const addItem = item => {
    if (sorting === 'normal') {
      const newItems = [...items, item]
      setItems(newItems)
      return newItems
    } else if (sorting === 'reverse') {
      const newItems = [item, ...items]
      setItems(newItems)
      return newItems
    }
  }

  /**
   * It takes an object with properties and values that you want to remove from the array, and returns a
   * new array with the items that don't match the properties and values removed
   */
  const removeItem = searchableProperties => {
    const properties = Object.keys(searchableProperties)
    const updatedItems = items.filter(item => {
      return !properties.every(property => item[property] === searchableProperties[property])
    })

    setItems(updatedItems)
    return updatedItems
  }

  const removeItemAtIndex = index => {
    const newItems = cloneDeep(items)
    newItems.splice(index, 1)
    setItems(newItems)
    return newItems
  }

  /**
   * @param {object} item
   * @param {number} index
   */
  const updateItem = (item, index) => {
    const newItems = cloneDeep(items)
    newItems.splice(index, 1, item)
    setItems(newItems)
    return newItems
  }

  const loadItems = items => {
    setItems([...items])
  }

  return { addItem, removeItem, updateItem, removeItemAtIndex, items, loadItems }
}
