import useSWR from "swr";
import {Character, Gender, Status} from "../types/Character";

type CollectionResponse = {
    info: {
        pages: number
    },
    results: Character[]
}

export type CollectionFilter = {
    name: string,
    gender: Gender,
    status: Status
}

const fetcher = (url: string): Promise<CollectionResponse> => fetch(url).then(r => r.json())

const getKey = (
    collectionName: string,
    page: number,
    filter: CollectionFilter|undefined
): string => {
    let baseUrl = `https://rickandmortyapi.com/api/${collectionName}/?page=${page}`

    if (filter) {
        const {name, status, gender} = filter
        if (name !== '') {
            baseUrl += `&name=${encodeURIComponent(name.trim().toLocaleLowerCase())}`
        }
        if (status !== Status.All) {
            baseUrl += `&status=${encodeURIComponent(status.toLocaleLowerCase())}`
        }
        if (gender !== Gender.All) {
            baseUrl += `&gender=${encodeURIComponent(gender.toLocaleLowerCase())}`
        }
    }

    return baseUrl
}

export function useCollection(collectionName: string, page: number, filter: CollectionFilter|undefined) {
    const { data, error } = useSWR(getKey(collectionName, page, filter), fetcher);
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