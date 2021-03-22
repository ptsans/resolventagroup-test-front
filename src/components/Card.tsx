import {Character} from "../types/Character";
import {Button, Card as MCard, CardActions, CardContent, CardMedia, makeStyles, Typography} from '@material-ui/core'

type CardProps = {
    character: Character,
    isExist?: boolean
}

export default function Card({ character, isExist = false }: CardProps) {
    const toggleSave = () => {
        const json = localStorage.getItem('characters')
        if (json) {
            const collection = JSON.parse(json)
            if (isExist) {
                delete collection[character.id]
            } else {
                collection[character.id] = character
            }
            localStorage.setItem('characters', JSON.stringify(collection))

            const event = new CustomEvent<Record<string, Character>>('update-characters', {
                detail: collection
            })
            window.dispatchEvent(event)

        } else {
            let collection: Record<string, Character> = {[character.id.toString()]: character}

            localStorage.setItem('characters', JSON.stringify(collection))

            const event = new CustomEvent<Record<string, Character>>('update-characters', {
                detail:collection
            })
            window.dispatchEvent(event)
        }
    }

    return (
        <MCard>
            <CardMedia
                sx={{
                    height: 150
                }}
                image={character.image}
                title={character.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {character.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Gender: {character.gender}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Status: {character.status}
                </Typography>
            </CardContent>
            <CardActions
                sx={{
                    justifyContent: 'flex-end'
                }}
            >
                <Button
                    onClick={() => toggleSave()}
                >
                    {isExist ? 'Delete from favorite' : 'Add to favorite'}
                </Button>
            </CardActions>
        </MCard>
    )
}