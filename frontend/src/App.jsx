
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Starter from './components/starter'
import Login from './components/login'
import Signup from './components/signup'
import AiInterview from './components/aiInterview'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Starter/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path="/ai-interview" element={<AiInterview />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
