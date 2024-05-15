interface ReturnDto {
    customerId: string,
    movieId: string
}

interface AuthDto {
    email: string,
    password: string
}

interface UserDto {
    name: string,
    email: string,
    password: string,
    isAdmin?: string //default = false
}

interface RentalDto {
    customerId: string,
    movieId: string
}

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

export {
    GenreDto,
    MovieDto,
    CustomerDto,
    RentalDto,
    UserDto,
    AuthDto,
    ReturnDto
}