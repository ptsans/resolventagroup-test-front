import * as React from 'react';
import {useEffect, useState} from 'react';
import MAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import {Gender, Status} from "../types/Character";
import {CollectionFilter} from "../hooks/useCollection";

type AppbarProps = {
    filterUpdate(filter: CollectionFilter): void
}

export default function Appbar({filterUpdate}: AppbarProps) {
    const [name, setName] = useState<string>('')
    const [gender, setGender] = useState<Gender>(Gender.All)
    const [status, setStatus] = useState<Status>(Status.All)

    useEffect(() => {
        const filter: CollectionFilter = {
            gender,
            name,
            status
        }
        filterUpdate(filter)
    }, [name, gender, status])

    return (
        <MAppBar position="static">
            <Toolbar
                sx={{
                    display: 'grid',
                    gap: '2rem',
                    gridAutoFlow: 'column',
                    padding: '1rem 0'
                }}
            >
                <Typography variant="h6" noWrap component="div">
                    Home Page
                </Typography>
                <TextField
                    color="secondary"
                    variant="outlined"
                    id="name-input"
                    label="Search name"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value)
                    }}
                />
                <FormControl
                    variant="outlined"
                    color="secondary"
                >
                    <InputLabel id="gender-select-label">Gender</InputLabel>
                    <Select
                        labelId="gender-select-label"
                        id="gender-select"
                        value={gender}
                        onChange={(e) => {
                            setGender(e.target.value)
                        }}
                    >
                        <MenuItem value={Gender.All}>{Gender.All}</MenuItem>
                        <MenuItem value={Gender.None}>{Gender.None}</MenuItem>
                        <MenuItem value={Gender.Female}>{Gender.Female}</MenuItem>
                        <MenuItem value={Gender.Male}>{Gender.Male}</MenuItem>
                        <MenuItem value={Gender.Genderless}>{Gender.Genderless}</MenuItem>
                    </Select>
                </FormControl>

                <FormControl
                    variant="outlined"
                    color="secondary"
                >
                    <InputLabel id="status-select-label">Status</InputLabel>
                    <Select
                        labelId="status-select-label"
                        id="status-select"
                        label="Status"
                        value={status}
                        onChange={(e) => {
                            setStatus(e.target.value)
                        }}
                    >
                        <MenuItem value={Status.All}>{Status.All}</MenuItem>
                        <MenuItem value={Status.None}>{Status.None}</MenuItem>
                        <MenuItem value={Status.Alive}>{Status.Alive}</MenuItem>
                        <MenuItem value={Status.Dead}>{Status.Dead}</MenuItem>
                    </Select>
                </FormControl>
            </Toolbar>
        </MAppBar>
    );
}