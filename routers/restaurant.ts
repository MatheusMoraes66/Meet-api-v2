import * as restify from 'restify'
import { Restaurant } from '../models/restaurants'
import { JSRepository } from '../common/jsRepository'

class RestaurantRouter extends JSRepository<Restaurant> {
    constructor() {
        super(Restaurant);
    }

    findMenu = (req, resp, next) => {
        Restaurant.findById(req.params.id, "+menu")
            .then(rest => {
                if (!rest) {
                    throw new next;
                }

                resp.json(rest.menu)
                return next()
            }).catch(next)
    }

    replaceMenu = (req, resp, next) => {
        Restaurant.findById(req.params.id).then(rest => {
            if (!rest) {
                throw new next
            }

            rest.menu = req.body
            return rest.save
        }).then(rest => {
            resp.josn(rest)
            return next()
        }).catch(next)
    }

    applyRoutes(application: restify.Server) {

        application.get('/restaurants', this.findAll)

        application.get('/restaurants/menu', this.findMenu)

        application.get('/restaurants/:id', [this.validationId, this.findById])

        application.post('/restaurants', this.save)

        application.put('/restaurants/:id', [this.validationId, this.update])

        application.patch('/restaurants/:id', [this.validationId, this.findByIdAndUpdate])

        application.del('/restaurants/:id', [this.validationId, this.delete])


        application.get('/restaurants/:id/menu', [this.validationId, this.findMenu])
    }

}

export const restaurantRouter = new RestaurantRouter()