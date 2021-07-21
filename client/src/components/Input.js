import { Grid, IconButton, InputAdornment, TextField } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import React from 'react'

const Input = (props) => {
    return (
        <Grid item xs={12} sm={props.half ? 6 : 12}>
            <TextField
                {...props}
                autoComplete={props.name}
                InputProps={props.name === 'password' ? {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={props.handleShowPassword}>
                                {props.type === 'password' ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    )
                } : null
                }
                autoFocus
                variant="outlined"
                margin="normal"
                required
                fullWidth
            />
        </Grid>
    )
}

export default Input
