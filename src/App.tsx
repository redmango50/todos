import NavBar from "./Component/NavBar"
import {Box} from "@mui/material"
import QuickSelect from "./Component/QuickSelect"
import { useState } from "react"
import { logContext } from "./logContext"
import MainSection from "./Component/MainSection"

function App() {
  const [log, setLog] = useState<string | undefined>(undefined)

  return (
    <logContext.Provider value={{log, setLog}}>
    <Box bgcolor={'hsl(0 0% 80%)'} sx={{display: 'flex', alignItems: 'center' ,justifyContent: 'center', minHeight: '100vh', width: '100%'}}>
      <NavBar/>
      <MainSection/>
      <QuickSelect/>
    </Box>
    </logContext.Provider>
  )
}

export default App
