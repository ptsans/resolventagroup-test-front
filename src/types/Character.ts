export enum Gender {
    All= 'All',
    None = 'unknown',
    Female = 'Female',
    Male = 'Male',
    Genderless = 'Genderless'
}

export enum Status {
    All = 'All',
    None = 'unknown',
    Alive = 'Alive',
    Dead = 'Dead'
}

export type Character = {
    id: number,
    name: string,
    image: string,
    gender: Gender,
    status: Status
}