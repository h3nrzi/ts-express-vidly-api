import { Schema, model } from 'mongoose'
import moment from 'moment'

const movieSchema = new Schema({
    title: {
        type: String, required: true,
        trim: true,
        minlength: 5, maxlength: 255
    },
    dailyRentalRate: {
        type: Number, required: true,
        min: 0, max: 255
    },
})

const customerSchema = new Schema({
    name: {
        type: String, required: true,
        minlength: 5, maxlength: 50
    },
    isGold: {
        type: Boolean,
        default: false,
    },
    phone: {
        type: String, required: true,
        minlength: 5, maxlength: 50
    }
})

const rentalSchema = new Schema({
    customer: customerSchema,
    movie: movieSchema,
    dateOut: {
        type: Date, required: true,
        default: Date.now
    },
    dateReturned: Date,
    rentalFee: {
        type: Number,
        min: 0
    }
})

rentalSchema.statics.lookup = function (customerId, movieId) {
    return this.findOne({
        'customer._id': customerId,
        'movie._id': movieId
    })
}

rentalSchema.methods.returns = function () {
    this.dateReturned = new Date();

    const rentalDays = moment().diff(this.dateOut, 'days')
    this.rentalFee = rentalDays * this.movie.dailyRentalRate
}

module.exports = model('Rental', rentalSchema)