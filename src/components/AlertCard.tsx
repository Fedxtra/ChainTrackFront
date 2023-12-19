'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, Grid, Link } from '@mui/material';
import { MappedAlert } from '@/api/api';

interface AlertCardProps {
  alert: MappedAlert;
}

const AlertCard = ({ alert }: AlertCardProps) => {
  return (
    <Card>
      <CardContent>
        <Grid container flexDirection="column" gap="12px">
          <Typography variant="body1" color="text.secondary">
            Category: {alert.category ?? '-'}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Date: {new Date(alert.createdAt).toLocaleString() ?? '-'}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Amount: {alert.amount ?? 0}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {alert.isOutgoing ? 'To' : 'From'}: {alert.address ?? '-'}
          </Typography>
          <Box display="flex" gap="3px">
            <Typography variant="body1" color="text.secondary">
              URL:{' '}
            </Typography>
            {alert.url ? (
              <Link href={alert.url} target="_blank">
                <Typography variant="body1">
                  {alert.url ? new URL(alert.url).hostname : alert.url}
                </Typography>
              </Link>
            ) : (
              '-'
            )}
          </Box>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AlertCard;
