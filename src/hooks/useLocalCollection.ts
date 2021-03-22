import {useEffect, useState} from "react";
import {Character} from "../types/Character";

type UpdateDetail = Record<string, Character>


export function useLocalCollection(collectionName: string) {
    const [saved, setSaved] = useState<Record<string, Character>>(() => {
        const json = localStorage.getItem('characters')
        if (!json) return {}
        return JSON.parse(json)
    })

    useEffect(() => {
        function handleCollectionChange(e: StorageEvent) {
            if (e.key === collectionName && e.newValue) {
                setSaved(JSON.parse(e.newValue))
            }
        }

        function handleItemUpdate(e: CustomEvent) {
            const collection: UpdateDetail = e.detail

            console.log(e)
            setSaved(collection)
        }

        window.addEventListener('storage', handleCollectionChange, false)
        window.addEventListener('update-characters', handleItemUpdate, false)

        return () => {
            window.removeEventListener('storage', handleCollectionChange, false)
            window.addEventListener('update-characters', handleItemUpdate, false)
        };
    }, []);

    return { saved }
}