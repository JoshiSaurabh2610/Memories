import { Grid, IconButton, InputAdornment, TextField } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import React from 'react'

const Input = ({half,name, value, onChange,label,handleShowPassword,type}) => {
    return (
        <Grid item xs={12} sm={half ? 6 : 12}>
            <TextField
                name={name}
                value={value}
                onChange={onChange}
                label={label}
                type={type}
                autoComplete={name}
                InputProps = { name === 'password' ? {
                    endAdornment:(
                        <InputAdornment position="end">
                            <IconButton onClick={handleShowPassword}>
                                {type === 'password' ? <Visibility/> : <VisibilityOff/>}
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
