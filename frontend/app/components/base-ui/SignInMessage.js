"use client"

import React from 'react';
import { Grid, Button, Typography } from '@mui/material';
import { signIn, signOut } from "next-auth/react"
export default function SignInMessage({callbackUrl}) {
    return (
        <Grid container width={"100%"} height={"300px"} justifyContent={"center"} alignItems={"center"}>
            <Grid item>You need to sign in.</Grid>
            <Button onClick={() => signIn("google",{ callbackUrl: '/' })} > sign in</Button>
        </Grid>
    )
}