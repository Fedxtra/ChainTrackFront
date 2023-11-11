import * as React from 'react';
import Appbar from "./appbar";
import Card from "./card";
import {List, Grid, Paper} from "@mui/material";
import {TypeSpecimen} from "@mui/icons-material";
import Typography from "@mui/material/Typography";


export default function Home() {
  return (
    <main>
        <Appbar/>
        <Grid container spacing={0} sx={{ width: '100%', maxWidth: '100%', margin: 1}}>
            <Grid item md={3}>
                <Paper sx={{width: 100, height: 250}}>
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
