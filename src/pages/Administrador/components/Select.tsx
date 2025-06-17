import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useFileCSV } from '@/hooks/Administrador/UseFileCSV'
import { type SelectLabelsFileCSVProps } from '@/types';

export default function SelectLabels({ items, handleChange, carreravalue }: SelectLabelsFileCSVProps) {
    const { value, handleSelectChange } = useFileCSV({ handleChange });


    console.log(carreravalue)
    console.log(value)
    return (
        <FormControl sx={{ minWidth: 120, width: '100%' }}>
            <Select
                value={carreravalue || ""}
                name='carreras'
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
