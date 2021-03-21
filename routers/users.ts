import * as restify from 'restify'
import { User } from '../models/users'
import { JSRepository } from '../common/jsRepository'

class UsersRouter extends JSRepository<User> {

    constructor() {
        super(User)
        this.on('beforeRender', document => {
            document.password = undefined // retira o password no retorno da resposta
        })
    }

    applyRoutes(application: restify.Server) {

        application.get('/users', this.findAll)

        application.get('/users/:id', this.findById)

        application.post('/users', this.save)

        application.put('/users/:id', [this.validationId, this.update])

        application.patch('/users/:id', [this.validationId, this.findByIdAndUpdate])

        application.del('/users/:id', [this.validationId, this.delete])

    }
}

export const usersRouter = new UsersRouter()
