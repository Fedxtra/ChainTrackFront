'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Box, Grid, Icon, Link} from '@mui/material';
import {Transaction} from "@/api/api";
import BathtubIcon from '@mui/icons-material/Bathtub';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

interface TransactionCardProps {
  transaction: Transaction;
}

const TransactionCard = ({ transaction }: TransactionCardProps) => {
  const link = transaction.url ?? '-';

  return (
    <Card>
      <CardContent>
        <Grid container flexDirection="column" gap="12px">
          <Box>
            <Typography variant="body1" color="text.secondary">
              Name: {transaction.name ?? '-'}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body1" color="text.secondary">
              Category: {transaction.category ?? '-'}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body1" color="text.secondary">
              Amount: {transaction.amount ?? 0}
            </Typography>
          </Box>
          {transaction.isOutgoing ? (
            <Box>
              <Typography variant="body1" color="text.secondary">
                To: {transaction.address ?? '-'}
              </Typography>
            </Box>
          ) : (
            <Box>
              <Typography variant="body1" color="text.secondary">
                From: {transaction.address ?? '-'}
              </Typography>
            </Box>
          )}
          <Box>
            <Typography variant="body1" color="text.secondary">
              Last Transaction: {transaction.lastTransactionAt ? new Date(transaction.lastTransactionAt).toDateString() : '-'}
            </Typography>
          </Box>
          <Box display="flex" gap="6px">
            <Typography variant="body1" color="text.secondary">
              Is active:
            </Typography>
            {transaction.isActive ? (
              <CheckCircleIcon color="success" fontSize="small" />
            ) : (
              <RemoveCircleIcon color="error" fontSize="small" />
            )}
          </Box>
          <Box display="flex" gap="6px">
            <Typography variant="body1" color="text.secondary">
              Notify:
            </Typography>
            {transaction.notify ? (
              <CheckCircleIcon color="success" fontSize="small" />
            ) : (
              <RemoveCircleIcon color="error" fontSize="small" />
            )}
          </Box>
          <Box display="flex" gap="6px">
            {!transaction.icon && (
              <Icon fontSize="small"><BathtubIcon /></Icon>
            )}
            <Link href={link} target="_blank">{link}</Link>
          </Box>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TransactionCard;
