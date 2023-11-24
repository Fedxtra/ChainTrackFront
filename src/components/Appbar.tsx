'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { Logo } from './Logo';
import { useState } from 'react';
import {
  ALERTS_ROUTE,
  HOME_ROUTE,
  POPULAR_ROUTE,
  TRANSACTIONS_ROUTE,
} from '@/helper/routes';
import { useRouter } from 'next/navigation';
import { ToggleTheme } from '@/components/ToggleTheme';
import auth from '@/app/auth';
import useStore from '@/helper/store';

const pages = [
  {
    name: 'Popular',
    link: POPULAR_ROUTE,
  }, {
    name: 'Transactions',
    link: TRANSACTIONS_ROUTE,
  },
  {
    name: 'Alerts',
    link: ALERTS_ROUTE,
  },
];

export default function MainAppBar() {
  const { setState } = useStore();
  const [walletConnected, setWalletConnected] = useState<boolean>(false);
  const [walletSigned, setWalletSigned] = useState<boolean>(false);
  const [address, setAddress] = useState<string|null>(null);
  const router = useRouter();

  async function connect(){
    const address = await auth.connect();
    setWalletConnected(true);
    setAddress(address);
    setState({
      address: address,
      connected: true
    });
  }

  async function sign(){
    if (!walletConnected) {
      throw new Error('Wallet not connected');
    }
    if (address === null) {
        throw new Error('Address not set');
    }
    setWalletSigned(await auth.sign(address));
    setState('signed', true);
  }

  return (
    <AppBar position="static">
      <Box paddingLeft="1.2rem" paddingRight="1.2rem">
        <Toolbar disableGutters>
          <Button
            variant="contained"
            onClick={() => router.push(`/${HOME_ROUTE}`)}
            className="logo-navigation-button"
          >
            <Box display="flex" alignItems="center">
              <Logo size={70} />
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="a"
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
          </Button>

          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            {pages.map((page) => (
              <Button
                key={JSON.stringify(page)}
                onClick={() => router.push(`/${page.link}`)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }} display="flex" gap="12px">
            <ToggleTheme />
            {
              walletSigned ? (
                <Tooltip title="Signed">
                  <Button
                    color="secondary"
                    variant="contained"
                  >
                    {' '}
                    Signed{' '}
                  </Button>
                </Tooltip>
              ) : (walletConnected ? (
              <Tooltip title="Sign">
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => sign()}
                >
                  {' '}
                  Sign{' '}
                </Button>
              </Tooltip>
            ) : (
              <Tooltip title="Connect">
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => connect()}
                >
                  {' '}
                  Connect{' '}
                </Button>
              </Tooltip>
            ))}
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
}
