'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { Logo } from './Logo';
import { useCallback, useEffect, useState } from 'react';
import { ALERTS_ROUTE, HOME_ROUTE, TRANSACTIONS_ROUTE } from '@/helper/routes';
import { useRouter } from 'next/navigation';
import { ToggleTheme } from '@/components/ToggleTheme';
import auth from '@/app/auth';
import useStore from '@/helper/store';
import { UserData } from '@/helper/types';
import { getProfileMetadata } from '@/api';
import apiService from '@/api/api';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

const pages = [
  {
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
  const [address, setAddress] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<UserData>();
  const router = useRouter();

  async function connect() {
    const address = await auth.connect();
    setWalletConnected(true);
    setAddress(address);
    setState({
      address: address,
      connected: true,
    });
  }

  async function sign() {
    if (!walletConnected) {
      throw new Error('Wallet not connected');
    }
    if (address === null) {
      throw new Error('Address not set');
    }
    setWalletSigned(await auth.sign(address));
    setState('signed', true);
  }

  const loadCurrentUserData = useCallback(async () => {
    const newCurrentUserData = await apiService.readUser('1');
    const currentUserWithMetadata =
      await getProfileMetadata(newCurrentUserData);
    setCurrentUser(currentUserWithMetadata);
  }, []);

  useEffect(() => {
    loadCurrentUserData();
  }, [loadCurrentUserData]);

  return (
    <AppBar position="static">
      <Box>
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

          <Box
            sx={{ flexGrow: 0 }}
            display="flex"
            gap="12px"
            alignItems="center"
          >
            <ToggleTheme />
            {walletSigned ? (
              <Tooltip title="Signed">
                <Button color="secondary" variant="contained">
                  {' '}
                  Signed{' '}
                </Button>
              </Tooltip>
            ) : walletConnected ? (
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
            )}
            <Card className="current-user-avatar">
              <CardHeader
                avatar={
                  <Avatar
                    src={currentUser?.profileImageUrl}
                    alt="Profile image"
                    sx={{ width: 56, height: 56 }}
                  >
                    {currentUser &&
                      !currentUser.profileImageUrl &&
                      currentUser.name &&
                      currentUser.name[0].toUpperCase()}
                  </Avatar>
                }
                title={currentUser?.name ?? '-'}
                subheader={
                  <div>
                    <Typography variant="body2">
                      Followers: {currentUser?.followerCount ?? 0}
                    </Typography>
                    <Typography variant="body2">
                      Following: {currentUser?.followingCount ?? 0}
                    </Typography>
                  </div>
                }
              />
            </Card>
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
}
