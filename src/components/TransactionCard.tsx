'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, Grid, Link } from '@mui/material';
import { Transaction } from '@/api/api';
import BathtubIcon from '@mui/icons-material/Bathtub';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';

interface TransactionCardProps {
  transaction: Transaction;
}

const TransactionCard = ({ transaction }: TransactionCardProps) => {
  return (
    <Card>
      <CardHeader
        title={transaction.name ?? '-'}
        avatar={
          <Avatar
            src={transaction.icon}
            alt="Transaction image"
            sx={{ width: 56, height: 56 }}
          >
            <BathtubIcon />
          </Avatar>
        }
      />
      <CardContent>
        <Grid container flexDirection="column" gap="12px">
          <Typography variant="body1" color="text.secondary">
            Category: {transaction.category ?? '-'}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Amount: {transaction.amount ?? 0}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {transaction.isOutgoing ? 'To' : 'From'}:{' '}
            {transaction.address ?? '-'}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Last Transaction:{' '}
            {transaction.lastTransactionAt
              ? new Date(transaction.lastTransactionAt).toDateString()
              : '-'}
          </Typography>
          <Box display="flex" gap="3px">
            <Typography variant="body1" color="text.secondary">
              Is active:
            </Typography>
            {transaction.isActive ? (
              <CheckCircleIcon color="success" fontSize="small" />
            ) : (
              <RemoveCircleIcon color="error" fontSize="small" />
            )}
          </Box>
          <Box display="flex" gap="3px">
            <Typography variant="body1" color="text.secondary">
              Notify:
            </Typography>
            {transaction.notify ? (
              <CheckCircleIcon color="success" fontSize="small" />
            ) : (
              <RemoveCircleIcon color="error" fontSize="small" />
            )}
          </Box>
          <Box display="flex" gap="3px">
            <Typography variant="body1" color="text.secondary">
              URL:{' '}
            </Typography>
            {transaction.url ? (
              <Link href={transaction.url} target="_blank">
                <Typography variant="body1">
                  {transaction.url
                    ? new URL(transaction.url).hostname
                    : transaction.url}
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

export default TransactionCard;
