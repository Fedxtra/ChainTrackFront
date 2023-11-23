'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { getProfileMetadata } from '@/api';
import { UserData } from '@/helper/types';
import useThrowAsyncError from '@/helper/errorHandler';
import { Tab, Tabs, Box, Paper, useTheme, Grid } from '@mui/material';
import UserCard from '@/components/UserCard';

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

function handleTabs(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const PopularPage = () => {
  const throwAsyncError = useThrowAsyncError();
  const [currentUser, setCurrentUser] = useState<UserData>();
  const [popularUsers, setPopularUsers] = useState<UserData[]>();
  const [tab, setTab] = React.useState(0);
  const theme = useTheme();

  const getUserData = useCallback(async () => {
    const data = await getProfileMetadata(
      '0x81C8fA3745Cec646C55e3dcfa5989707a7Ade03F',
    );
    setCurrentUser(data);
  }, [setCurrentUser]);

  useEffect(() => {
    getUserData().catch(throwAsyncError);
  }, [getUserData]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={2}>
        <Box>
          <UserCard userData={currentUser} />
        </Box>
      </Grid>
      <Grid item xs={10}>
        <Paper
          elevation={3}
          sx={{
            border: 1,
            borderRadius: '16px',
            borderColor: theme.palette.secondary.main,
            backgroundColor:
              theme?.palette?.mode === 'dark'
                ? 'rgba(0, 0, 0, 0.5)'
                : 'rgba(255, 255, 255, 0.5)',
          }}
        >
          <Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={tab}
                onChange={handleChange}
                aria-label="basic tabs"
                centered
              >
                <Tab label="Users" {...handleTabs(0)} />
                <Tab label="Transactions" {...handleTabs(0)} />
              </Tabs>
            </Box>
            <Box padding="12px 20px 20px 20px">
              <CustomTabPanel value={tab} index={0}>
                Item One
              </CustomTabPanel>
              <CustomTabPanel value={tab} index={1}>
                Item Two
              </CustomTabPanel>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default PopularPage;
