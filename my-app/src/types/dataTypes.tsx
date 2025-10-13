export type Images = {
    url: string,
    height: number,
    width: number
}

export type Album = {
    name: string,
    images: Images[],
    release_date: string
}

export type SongArtist = {
    name: string
    id: string
}

export type Artist = {
    id: string,
    name: string,
    images: Images[],
    genres: string[]
}

export type Track = {
    id: string,
    name: string,
    uri: string
    album: Album,
    artists: SongArtist[],
    images: Images[],
    external_ids: ISRC
}

export type ISRC = {
    isrc: string
}

export type RecentItem = {
    track: Track;
}
