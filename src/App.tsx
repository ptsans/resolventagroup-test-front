import * as React from 'react';

import {CollectionFilter, useCollection} from "./hooks/useCollection";
import {useCallback, useEffect, useState} from "react";
import {Container, Pagination} from "@material-ui/core";
import Card from "./components/Card";
import Grid from "./components/Grid";
import Appbar from "./components/Appbar";
import Favorites from "./components/Favorites";
import {useLocalCollection} from "./hooks/useLocalCollection";

export default function App() {
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState<CollectionFilter>()
    const { collection, pages } = useCollection('character', page, filter)
    const { saved } = useLocalCollection('characters')

    const filterUpdate = useCallback((filter: CollectionFilter) => {
        setFilter(filter)
        setPage(1)
    }, [])

    return (
        <Container
            maxWidth="md"
            sx={{
              padding: '2rem 0'
            }}
        >
            <Appbar
                filterUpdate={filterUpdate}
            />
            <Favorites />
            {
                collection && (
                    <>
                        <Grid>
                            {
                                collection.map((character) => {
                                    return <Card
                                        character={character}
                                        key={character.id}
                                        isExist={!!saved[character.id]}
                                    />
                                })
                            }
                        </Grid>
                        <Pagination
                            page={page}
                            count={pages}
                            color="primary"
                            onChange={(event, page) => setPage(page)}
                        />
                    </>
                )
            }
      </Container>
    )
}
