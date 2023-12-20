'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { UserData } from '@/helper/types';
import { Grid } from '@mui/material';

interface UserCardProps {
  userData: UserData;
}

const UserCard = ({ userData }: UserCardProps) => {
  return (
    <Card>
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
        <Grid container flexDirection="column" gap="12px">
          <Typography variant="body1" color="text.secondary">
            Followers: {userData?.followerCount ?? 0}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Following: {userData?.followingCount ?? 0}
          </Typography>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default UserCard;
