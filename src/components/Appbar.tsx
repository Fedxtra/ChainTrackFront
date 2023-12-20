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
import {
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

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
  const theme = useTheme();
  const screenLessThanMedium = useMediaQuery(theme.breakpoints.down('md'));
  const { setState } = useStore();
  const [walletConnected, setWalletConnected] = useState<boolean>(false);
  const [walletSigned, setWalletSigned] = useState<boolean>(false);
  const [address, setAddress] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<UserData>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const connect = useCallback(async () => {
    const address = await auth.connect();
    if (typeof address === 'undefined') {
      return;
    }

    setWalletConnected(true);
    setAddress(address);
    setState({
      address: address,
      connected: true,
    });
  }, [setState]);

  const sign = useCallback(async () => {
    if (!walletConnected) {
      throw new Error('Wallet not connected');
    }
    if (address === null) {
      throw new Error('Address not set');
    }
    setWalletSigned(await auth.sign(address));
    setState('signed', true);
  }, [address, setState, walletConnected]);

  const loadCurrentUserData = useCallback(async () => {
    const newCurrentUserData = await apiService.readUser('1');
    const currentUserWithMetadata =
      await getProfileMetadata(newCurrentUserData);
    setCurrentUser(currentUserWithMetadata);
  }, []);

  useEffect(() => {
    loadCurrentUserData();
  }, [loadCurrentUserData]);

  const AuthComponent = useCallback(() => {
    if (walletSigned) {
      return (
        <Tooltip title="Signed">
          <Button color="secondary" variant="contained">
            {' '}
            Signed{' '}
          </Button>
        </Tooltip>
      );
    }

    if (walletConnected) {
      return (
        <Tooltip title="Sign">
          <Button color="secondary" variant="contained" onClick={() => sign()}>
            {' '}
            Sign{' '}
          </Button>
        </Tooltip>
      );
    }

    return (
      <Tooltip title="Connect">
        <Button color="secondary" variant="contained" onClick={() => connect()}>
          {' '}
          Connect{' '}
        </Button>
      </Tooltip>
    );
  }, [connect, sign, walletConnected, walletSigned]);

  return (
    <AppBar position="relative">
      <Box>
        <Toolbar disableGutters>
          <Box display="flex" flexGrow="1" alignItems="center">
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

            {!screenLessThanMedium && (
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
            )}
          </Box>

          <Box
            sx={{ flexGrow: 0 }}
            display="flex"
            gap="12px"
            alignItems="center"
          >
            {screenLessThanMedium ? (
              <>
                <IconButton
                  size="large"
                  onClick={(event) => setAnchorEl(event?.currentTarget)}
                >
                  <MenuIcon fontSize="large" />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={() => setAnchorEl(null)}
                  className="navigation-menu"
                >
                  <MenuItem
                    sx={{
                      '&:hover': {
                        cursor: 'default',
                        backgroundColor: 'inherit',
                      },
                    }}
                    divider
                  >
                    <Box
                      gap="12px"
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      flexGrow="1"
                    >
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
                        />
                      </Card>
                      <Box display="flex" gap="12px">
                        <ToggleTheme />
                        <AuthComponent />
                      </Box>
                    </Box>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      router.push(`/${HOME_ROUTE}`);
                      setAnchorEl(null);
                    }}
                    divider
                    sx={{ fontSize: '2rem' }}
                  >
                    Home
                  </MenuItem>
                  {pages.map((page) => (
                    <MenuItem
                      key={JSON.stringify(page)}
                      onClick={() => {
                        router.push(`/${page.link}`);
                        setAnchorEl(null);
                      }}
                      divider
                      sx={{ fontSize: '2rem' }}
                    >
                      {page.name}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <>
                <ToggleTheme />
                <AuthComponent />
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
              </>
            )}
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
}
