import { useState, useEffect } from "react"

function App() {
  const [message, setMessage] = useState("Loading..")

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await fetch("http://localhost:5001/")
        const data = await response.json()
        setMessage(data.message)
      } catch (error) {
        console.error(error)
        setMessage("Error fetching message")
      }
    } 
    fetchMessage()  
  }, [])
  
  return (
    <div className="flex justify-center items-center h-screen">
      <h1>{message}</h1>
    </div>  
  )
}

export default App
