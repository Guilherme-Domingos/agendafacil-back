import { Module } from '@nestjs/common';
import { PrismaModule } from './infra/prisma/prisma.module';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { auth } from './lib/auth';

@Module({
  imports: [
    AuthModule.forRoot({auth}),
    PrismaModule,
  ],
  controllers: [],
  providers: [],
  exports: [], 
})
export class AppModule {}