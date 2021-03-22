import {Box, BoxProps} from "@material-ui/core";

type GridProps = BoxProps

export default function Grid({children}: GridProps) {
    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '2rem',
                padding: '2rem 0'
            }}
        >
            {children}
        </Box>
    )
}