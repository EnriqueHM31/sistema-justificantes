import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { type InputFileUploadProps } from '@/types';
import { useFile } from '@/hooks/Administrador/useFile';


export default function InputFileUpload({ onFileRead, inputFileRef }: InputFileUploadProps) {

    const { handleChange, VisuallyHiddenInput } = useFile({ onFileRead });

    return (
        <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            sx={{
                backgroundColor: '#0b347e',
                color: '#fff',
                fontSize: '.6rem',
                '&:hover': {
                    backgroundColor: '#0b347e',
                    color: '#fff',
                },
                width: {
                    xs: 'fit-content',
                    md: 'fit-content',
                },
                padding: '.5rem 2rem',
            }}
        >
            Carga CSV
            <VisuallyHiddenInput
                type="file"
                onChange={handleChange}
                accept="text/csv"
                ref={inputFileRef}
            />
        </Button>
    );
}
