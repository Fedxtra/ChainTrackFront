'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Box, Grid, Link} from '@mui/material';
import {RecurringTransaction} from "@/api/api";

interface TransactionCardProps {
  popularTransaction: RecurringTransaction;
}

const TransactionCard = ({ popularTransaction }: TransactionCardProps) => {
  const link = popularTransaction.url ?? '-';

  return (
    <Card>
      <CardContent>
        <Grid container flexDirection="column" gap="12px">
          <Box>
            <Typography variant="body1" color="text.secondary">
              Name: {popularTransaction.name ?? '-'}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body1" color="text.secondary">
              Url: <Link href={link} target="_blank">{link}</Link>
            </Typography>
          </Box>
          <Box>
            <Typography variant="body1" color="text.secondary">
              Category: {popularTransaction.category ?? '-'}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body1" color="text.secondary">
              Amount: {popularTransaction.amount ?? 0}
            </Typography>
          </Box>
          {popularTransaction.isOutgoing ? (
            <Box>
              <Typography variant="body1" color="text.secondary">
                To: {popularTransaction.address ?? '-'}
              </Typography>
            </Box>
          ) : (
            <Box>
              <Typography variant="body1" color="text.secondary">
                From: {popularTransaction.address ?? '-'}
              </Typography>
            </Box>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TransactionCard;
