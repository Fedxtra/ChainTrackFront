'use client';

import React, {useCallback, useEffect, useState} from 'react';
import apiService, {Transaction} from "@/api/api";
import useThrowAsyncError from "@/helper/errorHandler";
import {Box, CircularProgress, Grid, useTheme} from "@mui/material";
import TransactionCard from "@/components/TransactionCard";

const TransactionsPage = () => {
  const throwAsyncError = useThrowAsyncError();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const loadTransactionsData = useCallback(async () => {
    try {
      const usersTransactions = await apiService.readRecurringTransactions();
      const newTransactions = await Promise.all(usersTransactions.map((userTransactions) => apiService.readRecurringTransaction(userTransactions.recurringTransactionId)));
      setTransactions(newTransactions.map((newTransactions, index) => ({ ...newTransactions, ...(usersTransactions[index] || {}) })));
    } catch (err) {
      throwAsyncError(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadTransactionsData();
  }, [loadTransactionsData]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box>
          {transactions.length ? (
            <Box display="flex" gap="1.2rem" flexDirection="column">
              <Grid container spacing={2}>
                {transactions.map((transaction) => (
                  <Grid item xs={3} key={JSON.stringify(transaction)}>
                    <TransactionCard transaction={transaction} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          ) : (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default TransactionsPage;
