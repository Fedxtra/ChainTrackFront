'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { UserData } from '@/helper/types';
import { Box, Grid } from '@mui/material';

interface UserCardProps {
  userData?: UserData;
}

const UserCard = ({ userData }: UserCardProps) => {
  return (
    <Card
      sx={{
        boxShadow: 'none',
        backgroundColor: 'transparent',
        backgroundImage: 'none',
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            src={userData?.profileImageUrl}
            alt="Profile image"
            sx={{ width: 56, height: 56 }}
          />
        }
        title={userData?.name || '-'}
      />
      <CardContent>
        <Grid>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Followers: {userData?.followers ?? 0}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Monitors:
            </Typography>
          </Box>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default UserCard;
