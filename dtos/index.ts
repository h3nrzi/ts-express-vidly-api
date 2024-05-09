interface CustomerDto {
    name: string,
    isGold: boolean,
    phone: string
}

interface GenreDto {
    name: string
}

interface MovieDto {
    title: string,
    genreId: number,
    numberInStock: number,
    dailyRentalRate: number
}

export { GenreDto, MovieDto, CustomerDto }