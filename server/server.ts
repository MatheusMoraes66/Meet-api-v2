import * as restify from 'restify'
import { Router } from '../common/router';
import { environment } from '../common/environment'
import * as mongoose from 'mongoose';
import { mergePatchBodyParser } from './merge-path.parser';
import { handleError } from './error.handler'

export class Server {

    application: restify.Server

    initializeDb() {
        (<any>mongoose).Promise = global.Promise
        return mongoose.connect(environment.db.url, {
            useUnifiedTopology: true, //add it
            useNewUrlParser: true,   //add it
            //useMongoClient: true //old
        })
    }

    initRoutes(routers: Router[]): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                this.application = restify.createServer({
                    name: 'meat-api',
                    version: '1.0.0'
                })

                this.application.use(restify.plugins.queryParser())
                this.application.use(restify.plugins.bodyParser())
                this.application.use(mergePatchBodyParser)

                //routes
                for (let router of routers) {
                    router.applyRoutes(this.application)

                }

                this.application.listen(environment.server.port, () => {
                    resolve(this.application)
                })

                this.application.on('restifyError', handleError)
            } catch (err) {
                reject(err)
            }

        })
    }

    bootstrap(routers: Router[] = []): Promise<Server> {
        return this.initializeDb().then(() =>
            this.initRoutes(routers).then(() => this)
        )
    }
}