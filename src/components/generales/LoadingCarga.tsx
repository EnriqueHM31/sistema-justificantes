import { useState, useEffect } from 'react';
import CircularProgress, { type CircularProgressProps } from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function CircularProgressWithLabel(props: CircularProgressProps & { value: number }) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress size={100} variant="determinate" {...props} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                }}
            >
                <Typography variant="caption" component="div" sx={{ color: 'white', fontSize: '1.5rem' }}>
                    {`${Math.round(props.value)}%`}
                </Typography>
            </Box>
        </Box>
    );
}

interface CircularWithValueLabelProps {
    onComplete?: () => void;
}

export default function CircularWithValueLabel({ onComplete }: CircularWithValueLabelProps) {
    const [progress, setProgress] = useState(0);

    // Maneja el incremento de progreso
    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => {
                return prevProgress >= 100 ? 100 : prevProgress + 20;
            });
        }, 500);

        return () => clearInterval(timer);
    }, []);

    // Ejecuta onComplete cuando llegue a 100
    useEffect(() => {
        if (progress >= 100 && onComplete) {
            onComplete();
        }
    }, [progress, onComplete]);

    return (
        <div className="flex justify-center items-center fixed inset-0 z-60 bg-black/50">
            <CircularProgressWithLabel
                value={progress}
                sx={{
                    background: '#0f47ad',
                    color: '#fff',
                    borderRadius: '999px',
                    width: '100px',
                    height: '100px',
                }}
            />
        </div>
    );
}
