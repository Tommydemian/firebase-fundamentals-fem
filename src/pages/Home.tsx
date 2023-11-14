import { FIREBASE_AUTH } from '../firebase-config'
import {signInAnonymously} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

export const Home = () => {

  const navigate = useNavigate()

  const signIn = async() => {
    await signInAnonymously(FIREBASE_AUTH)
    navigate('/dashboard')
  }

  return (
    <div>
      <button onClick={signIn}>
        Sign in Anonymously
      </button>
    </div>
  )
}
