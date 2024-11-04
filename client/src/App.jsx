import React, { useMemo } from 'react'
import {io} from 'socket.io-client'
import { useEffect, useState } from 'react';
import {Container,Button,TextField,Typography} from '@mui/material'

const App = () => {
  const [message,setmessage] = useState('');
  const socket = useMemo(() => io('http://localhost:3000'),[]);

  function handlesubmit(e) {
    e.preventDefault();
    socket.emit('message',message);
    setmessage('');
  }

  
  useEffect(()=> {
    socket.on('connect',() => {
      console.log('connected',socket.id);
    });

    socket.on('welcome',(s) => {
      console.log(s)
    })

    return () => {
      socket.disconnect();
    }
  },[])

  return (
    <>
      <Container maxWidth='sm'>
        <Typography variant='h1' component='div' gutterBottom>
          Welcome to Socket.io
        </Typography>

        <form onSubmit={handlesubmit}>
          <TextField 
              value={message}
              onChange={(e) => setmessage(e.target.value)}
              id='outlined-basic'
              label='Outlined'
              variant='outlined'
          />
          <Button type='submit' variant='contained' color='primary' >Submit</Button>
        </form>
      </Container>
    </>
  )
}

export default App