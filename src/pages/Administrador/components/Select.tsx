import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import Select, { type SelectChangeEvent } from '@mui/material/Select';

interface ItemProps {
    name: string;
}

export default function SelectLabels({
    items,
    handleChange
}: {
    items: ItemProps[];
    handleChange: (value: string) => void;
}) {
    const [value, setValue] = useState('');

    const handleSelectChange = (event: SelectChangeEvent) => {
        const selectedValue = event.target.value;
        setValue(selectedValue); // actualiza el estado local
        handleChange(selectedValue); // notifica al componente padre
    };

    return (
        <FormControl sx={{ minWidth: 120, width: '100%' }}>
            <Select
                value={value}
                onChange={handleSelectChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                MenuProps={{
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    },
                    transformOrigin: {
                        vertical: 'top',
                        horizontal: 'left'
                    },
                    PaperProps: {
                        sx: {
                            mt: 1
                        }
                    }
                }}
            >
                <MenuItem value="" sx={{ fontFamily: 'Montserrat' }}>
                    <p className="text-sm font-bold">Selecciona una opción</p>
                </MenuItem>

                {items.map(({ name }, index) => (
                    <MenuItem key={index} value={name}>
                        <p className="text-sm font-bold">{name}</p>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
