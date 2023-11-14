import React from 'react'
import { Todo } from '../types'

type Props = {
  todos: Todo[]
}

export const TodoListDisplay: React.FC<Props> = ({todos}) => {
  return (
    <div>
      {
        todos && todos.map(item => (
          <div style={{ display: 'flex', gap: '5em'}} key={item.id}>
            <p style={{ background: 'red' }}>{item.task}</p>
            <p style={{ background: 'red' }}>{item.completed ? 'completed' : 'not completed'}</p>
          </div>)
        )
      }
    </div>
  )
}
