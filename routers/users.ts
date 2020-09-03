import { Router } from '../common/router';
import * as restify from 'restify';
import { User } from '../models/users';
import { NotFoundError } from 'restify-errors';

class UsersRouter extends Router {

    constructor() {
        super()
        this.on('beforeRender', document => {
            document.password = undefined
        })
    }

    applyRoutes(application: restify.Server) {

        application.get('/users', (req, resp, next) => {
            User.find()
                .then(this.render(resp, next))
                .catch(next)
        })

        application.get('/users/:id', (req, resp, next) => {
            let id = parseInt(req.params.id);
            User.findById(id)
                .then(this.render(resp, next))
                .catch(next)
        })

        application.post('/users', (req, resp, next) => {
            let user = new User(req.body)
            user.save()
                .then(this.render(resp, next))
                .catch(next)
        })

        application.put('/users/:id', (req, resp, next) => {
            User.update({ _id: req.params.id }, req.body)
                .exec().then(result => {
                    if (result.n) {
                        return User.findById(req.params.id)
                    } else {
                        throw new NotFoundError('Documento não encontrado.')
                    }
                }).then(user => {
                    resp.json(user)
                    return next

                })
                .catch(next)
        })

        application.patch('/users/:id', (req, resp, next) => {
            const options = { new: true }
            User.findByIdAndUpdate(req.params.id, req.body, options)
                .then(this.render(resp, next))
                .catch(next)
        })

        application.del('/users/:id', (req, resp, next) => {
            User.deleteOne({ _id: req.params.id }).exec()
                .then((cmdResult: any) => {
                    if (cmdResult.result) {
                        resp.send(204)
                    } else {
                        throw new NotFoundError('Documento não encontrado.')
                    }
                    return next()
                })
                .catch(next)
        })

    }
}

export const usersRouter = new UsersRouter()