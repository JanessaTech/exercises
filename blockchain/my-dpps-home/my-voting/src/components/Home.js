import { Box, Button, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import {abi, contractAddr} from '../Constant/constants'
import {ethers} from 'ethers' // import ethers lib
import SimpleDialog from './SimpleDialog'
import { useNavigate } from 'react-router-dom'


export default function Home() {
    const navigate = useNavigate();
    const initData = {
        connected: false,
        isEnd: false,
        rows: [],
        address: '',
        contract: undefined,
        registeredNames: new Map([]),
        dialogOpen: false,
        name:''
    }
    const [state, setState] = React.useState({...initData, connected: localStorage.getItem('connected') === 'true'})

    const count = useRef(0)  // for debug
    useEffect(() => {
        count.current = count.current + 1;
    });
    
    useEffect( () => {  
        console.log("accountsChanged is added")
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', handleAccountsChanged)
        }
        return () => {
            console.log("accountsChanged is removed")
            if(window.ethereum) { 
                window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
            }
        }
    },[])// todo: the state is initiated when I add [] as the second parameter, why?

    const handleAccountsChanged = (accounts) => {
        console.log("accounts:", accounts)
        if( accounts.length > 0 && accounts[0] !== state.address) {
            updateStateByAccountChange(accounts[0])
        } else {
            console.log('run else in handleAccountsChanged')
        }
    }

    const updateStateByAccountChange = async (account) => {
        updateState({isReconnect: true})
    }

    useEffect(() => {
        const connected = localStorage.getItem('connected') === 'true'
        if (connected) {
            console.log('updateState({isReconnect: false}) ...')
            updateState({isReconnect: false})
        } else {
            navigate('/')
        }
    }, [])

    async function requestAccount() {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
    }

    const updateState = async ({isReconnect}) => {
        const provider = new ethers.BrowserProvider(window.ethereum)
        await requestAccount()
        const signer = await provider.getSigner()
        const address = await signer.getAddress()
        if (isReconnect) {
            console.log("MetaMask is reconnected at ", address)
        } else {
            console.log("MetaMask is connected at ", ethers.getAddress(address))
        }
        
        const contract = new ethers.Contract(contractAddr, abi, signer)
        const isEnd = await contract.isEnd()
        console.log('isEnd:', isEnd)
        const candidates = await contract.getCandidates()
        console.log('candidates:', candidates)
        const registeredName = await contract.getRegisterName()
        
        console.log("registeredName:", registeredName)
        let newRegisteredNames = state.registeredNames
        if (registeredName) {
            newRegisteredNames = state.registeredNames.set(ethers.getAddress(address), registeredName)
        }
        const newRows = []
        candidates.forEach((v) => {
            newRows.push({id: Number(v[0]), name: v[1], votedBy: v[2]})
        })
        console.log(newRows)
        setState({
            ...state, 
            connected: true, 
            isEnd: isEnd,
            rows: newRows,
            contract: contract,
            registeredNames: newRegisteredNames,
            address: ethers.getAddress(address)
            })
    }

    const handleReset = async () => {
        try {
            const tx = await state.contract.reset()
            await tx.wait() //important but why??
            console.log(tx)
            const isEnd = await state.contract.isEnd()
            const candiates = await state.contract.getCandidates()
            const newRows = []
            candiates.forEach((v) => {
                newRows.push({id: Number(v[0]), name: v[1], votedBy: v[2]})
            })
            setState({...state, registeredNames: new Map([]), isEnd: isEnd, rows: newRows})
        } catch (error) {
            console.error(error)
        }
    }

    const handleLogout = (e) => {
        e.preventDefault()
        console.log('handleLogout')
        localStorage.removeItem('connected')
        navigate('/')
    }
    

    const openDialog = (e) => {
        e.preventDefault()
        setState({...state, dialogOpen: true})
    }
    const closeDialog = (e) => {
        e.preventDefault()
        setState({...state, dialogOpen: false})
    }

    const handleVote = async (e, id) => {
        e.preventDefault()
        if (state.registeredNames.get(state.address)) {
            try {
                const tx = await state.contract.vote(id)
                await tx.wait() //important
                console.log(tx)
                const candiates = await state.contract.getCandidates()
                console.log("candiates =", candiates)
                const newRows = []
                candiates.forEach((v) => {
                    newRows.push({id: Number(v[0]), name: v[1], votedBy: v[2]})
                })
                setState({...state, rows: newRows})
            } catch (error) {
                console.error(error)
            }
        } else {
            openDialog(e)
        }   
    }

    const submitRegister = async (e) => {
        e.preventDefault()
        try {
            const tx = await state.contract.registerName(state.name)
            await tx.wait() //important
            console.log(tx)
            const regiteredName = await state.contract.getRegisterName();
            console.log("regiteredName:", regiteredName)
            const isEnd = await state.contract.isEnd()
            const newRegisteredNames = state.registeredNames.set(state.address, regiteredName)
            setState({...state, newRegisteredNames: newRegisteredNames, name: '', isEnd: isEnd})
        } catch (error) {
            console.error('failed to register name due to:', error)
            setState({...state, name:''}) // clear name othewise it will be used for another address
        }
    }

    const handleNameChanges = (e) => {
        e.preventDefault()
        setState({...state, name: e.target.value})
    }

  return (
    <Container>
        {/* {console.log("In rendering:", state)} */}
        <Box sx={{width:1, backgroundColor:'grey.200', mt:10}}>
            <Box><h1>Render Count: {count.current}</h1></Box>
            <Box sx={{display:'flex', justifyContent:'right', pr:3, pt:3}}><Button variant='contained' sx={{textTransform:'none'}} onClick={handleLogout}>Disconnect MetaMask</Button></Box>
            <Box sx={{display:'flex', justifyContent:'right', pr:3, pt:3}}><Button variant='contained' sx={{textTransform:'none'}} onClick={handleReset}>Reset</Button></Box>
            <Box sx={{display:'flex', justifyContent:'center', mb:3}}>
                <Box>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <Typography variant='h4'>Voting:</Typography>
                        </Grid>
                        <Grid item>
                            <Typography color='red'>{state.isEnd ? 'Finished' : 'In progressing'}</Typography>
                        </Grid>
                    </Grid>
                </Box>
                
            </Box>
            <Box sx={{display:'flex', justifyContent:'center'}}>
                <Box>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <Typography><strong>Address:</strong>{state.address}</Typography>
                            <Typography><strong>Name:</strong>{state.registeredNames.get(state.address)}</Typography>
                        </Grid>
                        <Grid item>                        
                            {
                                !state.registeredNames.get(state.address)&& <Box><TextField sx={{mr:2}} variant="standard" placeholder='register name' value={state.name} onChange={handleNameChanges}/><Button variant='contained' onClick={submitRegister} disabled={!state.name}>Register</Button></Box>
                            }
                            
                        </Grid>
                    </Grid>  
                </Box>
            </Box>
            <Box sx={{px:8, py:2}}>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table" size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">ID</TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">VotedBy</TableCell>
                                <TableCell align="center">Vote</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                state.rows.map((row) => (
                                    <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="center" component="th" scope="row">
                                            {row.id}
                                        </TableCell>
                                        <TableCell align="center" >{row.name}</TableCell>
                                        <TableCell align="center">{row.votedBy}</TableCell>
                                        <TableCell align="center">
                                        <Button variant='contained' onClick={(e) => handleVote(e, row.id)} disabled={row.votedBy.length !== 0}>Vote</Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>   
                    </Table>
                </TableContainer>
            </Box>
        </Box>
        <SimpleDialog handleClose={closeDialog} open={state.dialogOpen} address={state.address}/>
    </Container>
  )
}

