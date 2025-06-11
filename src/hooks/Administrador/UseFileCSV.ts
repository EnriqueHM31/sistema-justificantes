import { useState } from "react";
import { type SelectChangeEvent } from "@mui/material";

export function useFileCSV({ handleChange }: { handleChange: (value: string) => void }) {
    const [value, setValue] = useState('');

    const handleSelectChange = (event: SelectChangeEvent) => {
        const selectedValue = event.target.value;
        setValue(selectedValue); // actualiza el estado local
        handleChange(selectedValue); // notifica al componente padre
    };

    return {
        value,
        handleSelectChange,
    }
}