import { Fab, Modal, TextField, Stack, type TextFieldProps } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { type Theme  } from "@mui/material/styles";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { logContext } from "../logContext";
import { useContext } from "react";
import {auth} from '../firebase'


const FocusableTextField = (props: TextFieldProps) => {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);
  return <TextField {...props} inputRef={ref} />;
};

const QuickSelect = () => {
  const ctx = useContext(logContext)

  if (!ctx) {
    throw new Error("must be used within a logContext.Provider");
  }

  const {setLog} = ctx
  const collectionRef = collection(db, "todos");
  const [task, setTask] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = ()=>{
    setOpen(true);
  }
  const handleClose = ()=>{
    setOpen(false);
    setTask("");
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setTask(e.currentTarget.value);
  }

  const handleSubmit = async (e: React.KeyboardEvent) => {
     e?.preventDefault();
  setOpen(false);
  if (!task.trim()) return;

  try {
    await addDoc(collectionRef, {
      task: task.trim(),
      completed: false,
      createdAt: new Date(),
      userId: auth.currentUser?.uid,
    });

    const a = crypto.randomUUID().toString().substring(24)

    setTask("");
    setLog?.(`Task added ${a}`);
  } catch (err) {
    console.error("Error adding task:", err);
    setLog?.(`Error: ${String(err)}`);
  }
};

useEffect(() => {
  const handleKeyboardOpen = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey || e.key === "Meta") && e.key.toLowerCase() === "k") {
      e.preventDefault();
      setOpen(true);
    }
  };

  window.addEventListener("keydown", handleKeyboardOpen);
  return () => window.removeEventListener("keydown", handleKeyboardOpen);
}, []);
  

  return (
    <>
    <Fab onClick={handleOpen} color={'primary'} sx={{position: 'fixed', right: 16, bottom: 16}}>
        <AddIcon/>
    </Fab>
    <Modal open={open} onClose={handleClose} sx={{backdropFilter: 'blur(12px)', color: 'transparent'}}>
  <Stack sx={{ position: 'absolute', top: 10, left: '50%', transform: 'translate(-50%)', p: 3, gap: 1, width: 330, }}
  direction={'row'}
  >
    <FocusableTextField sx={{
    "& .MuiInputBase-input": {
      color: (theme: Theme) => theme.palette.primary.main,
      caretColor: (theme: Theme) => theme.palette.primary.main,
    },
    "& label.Mui-focused": {
      color: (theme: Theme) => theme.palette.primary.main,
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: (theme: Theme) => theme.palette.primary.main,
      },
    },
  }} label="Task name" variant="outlined" fullWidth value={task} onChange={handleChange} onKeyDown={(e: React.KeyboardEvent) => {if(e.key === "Enter"){handleSubmit(e)}}}
  />
  </Stack>
</Modal>
    </>
  )
}

export default QuickSelect