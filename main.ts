import { Server } from './server/server';
import { usersRouter } from './routers/users';
import { restaurantRouter } from './routers/restaurant'
import { reviewsRouter } from './routers/reviews';

const server = new Server()

server.bootstrap([usersRouter, restaurantRouter, reviewsRouter]).then(server => {
  console.log('Server is listening on: ', server.application.address())
}).catch(err => {
  console.log('Server failed to start')
  console.log(err)
  process.exit(1)
})
