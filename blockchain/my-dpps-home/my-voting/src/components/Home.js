import { Box, Button, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import {abi, contractAddr} from '../Constant/constants'
import {ethers} from 'ethers' // import ethers lib


export default function Home() {
    const [state, setState] = React.useState({
        connected: false,
        isEnd: false,
        rows: [
            {id: 0, name: 'jane', votedBy: ''},
            {id: 1, name: 'jane1', votedBy: 'rr'},
            {id: 2, name: 'jane2', votedBy: 'cc'},
        ],
        provider: undefined,
        address: '',
        contractReadOnly: undefined,
        contract: undefined,
        signer: undefined,
        registeredNames: new Map()
    })

    useEffect( () => {
       
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', handleAccountsChanged)
        }
        return () => {
            if(window.ethereum) {
                window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
            }
        }
    })

    const handleAccountsChanged = (accounts) => {
        console.log('handleAccountsChanged. accounts=', accounts)
        if( accounts.length > 0 && accounts[0] !== state.address) {
            setState({...state, address: accounts[0]})
        } else {
            setState({...state, connected: false, provider: undefined, address: '', signer: undefined, registeredNames: new Map()})
        }
    }

    const handleConnectMetaMask = async () => {
        if (window.ethereum) {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum)
                await provider.send("eth_requestAccounts", []);
                const signer = provider.getSigner()
                const address = await signer.getAddress()
                console.log("MetaMask is connected at ", address)
                const contractReadOnly = new ethers.Contract(contractAddr, abi, provider)
                const contract = await contractReadOnly.connect(signer)
                const candiates = await contractReadOnly.getCandidates()
                console.log(candiates)
                setState({
                    ...state, 
                    connected: true, 
                    provider: provider,
                    contractReadOnly: contractReadOnly,
                    contract: contract,
                    address: address, 
                    signer: signer})
            } catch (err) {
                console.log('Met err when trying to connect to MetaMask')
                console.log(err)
            }
        } else {
            console.log("Pls install MetaMask first")
        }
    }

    const getCandidates = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send("eth_requestAccounts", []);
        const contractReadOnly = new ethers.Contract(contractAddr, abi, provider)
        const candiates = await contractReadOnly.getCandidates()
        console.log(candiates)
    }

    const handleVote = (e, id) => {
        e.preventDefault()
        console.log('vote ', id)
    }

  return (
    <Container>
        <Box sx={{width:1, backgroundColor:'grey.200', mt:10}}>
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
                {
                    !state.connected ? <Button sx={{textTransform:'none'}} variant="contained" onClick={handleConnectMetaMask}>Connect MetaMask</Button> : <Box>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <Typography><strong>Address:</strong>{state.address}</Typography>
                            <Typography><strong>Name:</strong></Typography>
                        </Grid>
                        <Grid item>
                        
                            {
                                !state.registeredNames.get(state.address)&& <Box><TextField sx={{mr:2}} variant="standard" placeholder='register name'/><Button variant='contained'>Register</Button></Box>
                            }
                            
                        </Grid>
                    </Grid>  
                </Box>
                }
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
                                        <Button variant='contained' onClick={(e) => handleVote(e, row.id)} disabled={row.votedBy.length != 0}>Vote</Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>   
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    </Container>
  )
}

