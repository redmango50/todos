import {Box, Stack} from '@mui/material'
import ToDosRender from './ToDosRender'
import { useContext, useEffect, useState } from 'react'
import { getTodos } from '../firebase'
import { logContext } from '../logContext'

interface todosInterface{
    id: string,
    completed: boolean,
    createdAt: string,
    task: string,
    userId: string
}


const MainSection = () => {
    const ctx = useContext(logContext)

    if (!ctx) {
    throw new Error("must be used within a logContext.Provider");
  }

    const {setLog, log} = ctx;
    const [todos, setTodos] = useState<todosInterface[]>([]);

    useEffect(()=>{
        const task = async ()=>{
            try{
              const data = await getTodos();
              setTodos(data);
            }
            catch{
                setLog("Error while retriving data");
            }
        }
        task();
    }, [log]);

  return (
    <Box top={'40%'} sx={{display: 'absolute', mt: '8rem'}}>
        <Stack spacing={2} sx={{mb: 2}}>
            {todos.map(todo => (
                <ToDosRender key={todo.id} task={todo.task} completed={todo.completed} id={todo.id} />
            ))}
        </Stack>
    </Box>
  )
}

export default MainSection