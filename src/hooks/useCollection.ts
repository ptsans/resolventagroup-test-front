import useSWR from "swr";
import {Character} from "../types/Character";

type CollectionResponse = {
    info: {
        pages: number
    },
    results: Character[]
}

const fetcher = (url: string): Promise<CollectionResponse> => fetch(url).then(r => r.json())

export function useCollection(collectionName: string, page: number) {
    const { data, error } = useSWR(`https://rickandmortyapi.com/api/${collectionName}/?page=${page}`, fetcher);
    let collection, pages

    if (data && !error) {
        const {info, results} = data
        collection = results
        pages = info.pages
    }

    return {
        collection,
        pages,
        error
    }
}