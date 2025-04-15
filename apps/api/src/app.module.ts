import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './common/prisma/prisma.module';
import { ListenerModule } from './listener/listener.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PlayersModule } from './models/players/players.module';
import { UsersModule } from './models/users/users.module';
import { SbtsModule } from './models/sbts/sbts.module';
import { ResyncModule } from './resync/resync.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      introspection: true,
    }),
    PrismaModule,
    ListenerModule,
    PlayersModule,
    UsersModule,
    SbtsModule,
    ResyncModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
