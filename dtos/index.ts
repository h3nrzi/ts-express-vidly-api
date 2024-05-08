interface Customer {
    name: string,
    isGold: boolean,
    phone: string
}

interface Genre {
    name: string
}

interface Movie {
    title: string,
    genreId: number,
    numberInStock: number,
    dailyRentalRate: number
}

export { Genre, Movie, Customer }