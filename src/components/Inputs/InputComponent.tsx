
import { forwardRef } from 'react';
import { TextField, FormControl } from "@mui/material";
import { InputBaseComponentProps } from "./InputComponent.types";

export const InputComponent = forwardRef(({color, type, id, placeholder, name, label} :InputBaseComponentProps, ref) =>{
    return (
        <FormControl className="mb-5">
            <TextField
                color={color}
                required
                type={type}
                id={id}
                placeholder={placeholder}
                name={name}
                autoFocus
                autoComplete="true"
                fullWidth
                label={label}
            />
        </FormControl>
    )
});
