import { useState, useEffect } from "react"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001"

function App() {
  const [message, setMessage] = useState("Loading..")

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await fetch(`${API_URL}/`)
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
