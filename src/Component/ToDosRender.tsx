import {Stack, Checkbox, TextField, IconButton} from '@mui/material'
import { MdDelete } from 'react-icons/md';
import { useState, useRef, useContext } from 'react';
import { logContext } from '../logContext';
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

interface ToDosRenderProps{
    completed: boolean,
    task: string,
    id: string
}

const ToDosRender: React.FC<ToDosRenderProps> = ({completed, task, id}) => {
    const ctx = useContext(logContext)

    if (!ctx) {
        throw new Error("must be used within a logContext.Provider");
    }

    const {setLog} = ctx;
    const InputRef = useRef<HTMLInputElement | undefined>(undefined);
    const [disabled, setDisabled] = useState<boolean>(true);
    const [todo] = useState<string>(task);
    const [state] = useState<boolean>(completed);

    const handleClose = ()=> setDisabled(true);

    const handleBlur = ()=>{
        handleClose();
    }

    const handleDelete = async ()=>{
        try{
            await deleteDoc(doc(db, "todos", id));
            const a = crypto.randomUUID().toString().substring(24)
            setLog(`Deleted successfully ${a}`)
        }
        catch{
            setLog("Error while deleting ")
        }
    }

  return (
    <Stack spacing={3} direction={'row'} sx={{bgcolor: 'hsl(0 0% 80%)',transition: '80ms ease-in-out',padding: '1rem', width: 'fit-content', boxShadow: '0 1px 3px rgba(242, 242, 242, 1)', '&:hover': { bgcolor: 'rgba(230, 230, 230, 0.8)' }}}>
        <Checkbox checked={state}/>
        <TextField value={todo} inputRef={InputRef} variant='standard' disabled={disabled} onBlur={handleBlur}/>
        <Stack spacing={0.5} direction={'row'}>
        <IconButton onClick={handleDelete}>
            <MdDelete/>
        </IconButton>
        </Stack>
    </Stack>
  )
}

export default ToDosRender