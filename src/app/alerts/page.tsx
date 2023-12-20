'use client';

import React, { useCallback, useEffect, useState } from 'react';
import useThrowAsyncError from '@/helper/errorHandler';
import apiService, { MappedAlert } from '@/api/api';
import { Box, CircularProgress, Grid } from '@mui/material';
import AlertCard from '@/components/AlertCard';

const AlertsPage = () => {
  const throwAsyncError = useThrowAsyncError();
  const [alerts, setAlerts] = useState<MappedAlert[]>([]);

  const loadAlertsData = useCallback(async () => {
    try {
      const loadedAlerts = await apiService.readAlerts();
      const transactionsData = await Promise.all(
        loadedAlerts.map((loadedAlert) =>
          apiService.readRecurringTransaction(loadedAlert.transaction),
        ),
      );
      setAlerts(
        transactionsData.map((transaction, index) => ({
          ...transaction,
          ...(loadedAlerts[index] || {}),
        })),
      );
    } catch (err) {
      throwAsyncError(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadAlertsData();
  }, [loadAlertsData]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box>
          {alerts.length ? (
            <Box display="flex" gap="1.2rem" flexDirection="column">
              <Grid container spacing={3}>
                {alerts.map((alert) => (
                  <Grid
                    item
                    xs={12}
                    md={6}
                    lg={4}
                    key={alert.id || alert.transaction}
                  >
                    <AlertCard alert={alert} />
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

export default AlertsPage;
