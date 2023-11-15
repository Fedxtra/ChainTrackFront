'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { Logo } from './logo';
import { onboard } from './connect_wallet';
import {useState} from "react";

const pages = ['Transactions', 'Alerts', 'Popular'];

function MainAppBar() {
    const [walletConnected, setWalletConnected] = useState<boolean>(false);

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box display="flex" alignItems="center">
                        <Logo size={70} />
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        ChainTrack
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: 'flex' }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={() => {}}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    {walletConnected ? <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Connected">
                            <Button color="secondary" variant="contained"  onClick={() => {
                            }}
                            > Connected </Button>
                        </Tooltip>
                    </Box> : <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Connect">
                        <Button color="secondary" variant="contained"  onClick={() => {
                            onboard.connectWallet().then((res) => {
                                setWalletConnected(true);
                                // onboard.state.actions.
                            });
                        }}
                        > Connect </Button>
                    </Tooltip>
                </Box>}
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default MainAppBar;
