import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersController } from './conrtollers/users/users.controller';
import { DemoMiddleware } from './middlewares/demo/demo.middleware';
import { SecondMiddleware } from './middlewares/second/second.middleware';
import { UsersService } from './services/users/users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule implements NestModule {

  configure(consumer: MiddlewareConsumer) 
  {
    consumer
    .apply(DemoMiddleware)
    .forRoutes(
      {

        path:'users/newCreate',
        method: RequestMethod.POST,
      },
    )

    .apply(SecondMiddleware)
    .forRoutes(
      {

        path:'users/creatPost',
        method: RequestMethod.POST,
      },
    )
  }
}
