import { useState } from 'react'


import Datos from './components/datos'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     

     <Datos></Datos>
    </>
  )
}

export default App
