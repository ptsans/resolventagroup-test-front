export enum Gender {
    None = 'unknown',
    Female = 'Female',
    Male = 'Male',
    Genderless = 'Genderless'
}

export enum Status {
    None = 'unknown',
    Alive = 'Alive',
    Dead = 'Dead'
}

export type Character = {
    name: string,
    imageUrl: string,
    gender: Gender,
    status: Status
}