import * as React from 'react';
import MainAppBar from "./appbar";
import Card from "./card";
import {List, Grid, Paper} from "@mui/material";
import Typography from "@mui/material/Typography";


export default function Home() {
  return (
    <main>
        <MainAppBar/>
        <Grid container spacing={0} sx={{ width: '100%', maxWidth: '100%', margin: 1}}>
            <Grid item md={3}>
                <Paper sx={{width: 400, height: 800}}>
                    <Typography variant="h5" component="div">
                        Users data
                    </Typography>
                </Paper>
            </Grid>
            <Grid item md={9}>
                <List sx={{ width: '100%', maxWidth: '100%'}}>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                </List>
            </Grid>
        </Grid>
    </main>
  )
}
