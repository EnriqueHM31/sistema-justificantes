import { styled } from '@mui/material/styles';
import { type useFileProps } from "@/types";


export function useFile({ onFileRead }: useFileProps) {
    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files || files.length === 0) return;

        const file = files[0];

        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target?.result as string;
            const rows = text
                .split('\n')
                .map(row => row.trim())
                .filter(row => row.length > 0)
                .map(row => row.split(','));

            onFileRead(rows);
        };
        reader.readAsText(file);
    };

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    return {
        VisuallyHiddenInput,
        handleChange
    }
}