import { useEffect, useState } from 'react'
import { collection, doc, onSnapshot, setDoc } from 'firebase/firestore'
import { FIREBASE_AUTH, FIRESTORE } from '../firebase-config'
import { Markdown } from '../types'
import { User } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'

const markdownsCollection = collection( FIRESTORE, 'markdowns')

export const Dashboard = () => {

  const [markdowns, setMarkdowns] = useState<Markdown[]>([])
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  const navigate = useNavigate()


  // display markdowns => kinda GET and setState on em 
  useEffect(() => {
    onSnapshot(markdownsCollection, snapshot => {
      const markDownArray = snapshot.docs.map(d => ({
          ...d.data() as Markdown, 
          id: d.id
        }))
        setMarkdowns(markDownArray)
    })
  }, [])

  const newDocument = () => {
    // reference - where is this document located? 
    const newDoc = doc(markdownsCollection)
    // mutation - let me update the server document
    setDoc(newDoc, {markdowns: '', converted: ''})
    navigate(`/editor/${newDoc.id}`)
  }

  useEffect(() => {
    setCurrentUser(FIREBASE_AUTH.currentUser)
  }, [])

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser])

  return (
    <div>
      {
        markdowns.map(el => (
          <div>
            <Link key={el.id} to={`/editor/${el.id}`}>{el.id}</Link>
            <p>{el.markdown}</p>
            <p>{el.converted}</p>
          </div>
        ))
      }
      <div>{currentUser && currentUser?.isAnonymous}cmon</div>
      <button onClick={newDocument}>New Doc</button>
      </div>
  )
}
