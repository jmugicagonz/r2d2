"use client"

import React from 'react';
import { Grid, Typography } from "@mui/material";
import { useSession } from "next-auth/react"

export default function Welcome() {
    const { data: session } = useSession();
    return (
        <> 
            <Grid container width={"100%"} height={"300px"} justifyContent={"center"} alignItems={"center"}>
            <Grid item><Typography variant="h6">Welcome {session?.user?.name}!</Typography></Grid>
            </Grid> 
        </>
    )
}