import React, {useEffect, useState} from 'react'
import { TodoListDisplay } from '../components/TodoListDisplay'
import {collection, doc, onSnapshot} from 'firebase/firestore'
import { FIRESTORE } from '../firebase-config'
import { Todo } from '../types'

export const TodoPage = () => {

  const [todos, setTodos] = useState<Todo[]>([])

  const todosCol = collection(FIRESTORE, 'todos')

  useEffect(() => {
    // pub/sub model
    const unsubscribe = onSnapshot(todosCol, snapshot => {
      const todosArray = snapshot.docs.map(doc => ({...doc.data() as Todo, id: doc.id}))
      setTodos(todosArray)
    })

    return () => unsubscribe()
  }, [todosCol])

  return (
    <div>
        <p>Todo List</p>
        <TodoListDisplay todos={todos} />


    </div>
  )
}
