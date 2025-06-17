import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function IconoLoading() {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start', gap: '10px' }}>
            <CircularProgress size={20} color="inherit" />
        </Box>
    );
}