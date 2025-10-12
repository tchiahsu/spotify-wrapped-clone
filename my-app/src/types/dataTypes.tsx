export type Images = {
    url: string,
    height: number,
    width: number
}

export type Album = {
    name: string,
    images: Images[],
}

export type SongArtist = {
    name: string
}

export type Artist = {
    id: string,
    name: string,
    images: Images[],
}

export type Track = {
    id: string,
    name: string,
    album: Album,
    artists: SongArtist[],
    images: Images[],
}
