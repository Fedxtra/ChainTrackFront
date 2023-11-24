'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { getProfileMetadata } from '@/api';
import { UserData } from '@/helper/types';
import useThrowAsyncError from '@/helper/errorHandler';
import {Tab, Tabs, Box, Paper, useTheme, Grid, CircularProgress} from '@mui/material';
import UserCard from '@/components/UserCard';
import apiService, {RecurringTransaction} from "@/api/api";
import TransactionCard from "@/components/TransactionCard";

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
  const [popularUsers, setPopularUsers] = useState<UserData[]>([]);
  const [popularTransactions, setPopularTransactions] = useState<RecurringTransaction[]>([]);
  const [tab, setTab] = React.useState(0);
  const theme = useTheme();

  const loadUsersData = useCallback(async () => {
    try {
      const [newCurrentUserData, newPopularUsers] = await Promise.all([
        apiService.readUser('1'),
        apiService.readPopularUsers()
      ]);
      const currentUserWithMetadataPromise = getProfileMetadata(newCurrentUserData);
      const popularUsersWithMetadataPromise = Promise.all(newPopularUsers.map((popularUser) => getProfileMetadata(popularUser)));
      const [currentUserWithMetadata, popularUsersWithMetadata] = await Promise.all([
        currentUserWithMetadataPromise,
        popularUsersWithMetadataPromise
      ]);
      setCurrentUser(currentUserWithMetadata);
      setPopularUsers(popularUsersWithMetadata ?? []);
    } catch (err) {
      throwAsyncError(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadTransactionsData = useCallback(async () => {
    try {
      const newPopularTransactions = await apiService.readPopularRecurringTransactions();
      setPopularTransactions(newPopularTransactions);
    } catch (err) {
      throwAsyncError(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadUsersData();
    loadTransactionsData();
  }, [loadUsersData, loadTransactionsData]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
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
                {currentUser && !!popularUsers.length ? (
                  <Box display="flex" gap="1.2rem" flexDirection="column">
                    <Box>
                      <UserCard userData={currentUser} />
                    </Box>
                    <Grid container spacing={2}>
                      {popularUsers.map((popularUser) => (
                        <Grid item xs={4} key={popularUser.id}>
                          <UserCard userData={popularUser} />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                ) : (
                  <Box display="flex" justifyContent="center">
                    <CircularProgress />
                  </Box>
                )}
              </CustomTabPanel>
              <CustomTabPanel value={tab} index={1}>
                {popularTransactions.length ? (
                  <Box display="flex" gap="1.2rem" flexDirection="column">
                    <Grid container spacing={2}>
                      {popularTransactions.map((popularTransaction) => (
                        <Grid item xs={4} key={JSON.stringify(popularTransaction)}>
                          <TransactionCard popularTransaction={popularTransaction} />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                ) : (
                  <Box display="flex" justifyContent="center">
                    <CircularProgress />
                  </Box>
                )}
              </CustomTabPanel>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default PopularPage;
