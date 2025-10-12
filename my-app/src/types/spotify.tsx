export type Images = {
    url: string,
    height: number,
    width: number
}

export type Artist = {
    id: string,
    name: string,
    images: Images[],
}
