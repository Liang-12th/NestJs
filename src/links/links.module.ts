import { Module } from '@nestjs/common';
import { LinksService } from './links.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinksRepository } from './links.repository';
import { LinksController } from './links.controller';

@Module({
  imports:[TypeOrmModule.forFeature([LinksRepository])],
  providers: [LinksService],
  controllers: [LinksController],
  exports: [LinksService]
})
export class LinksModule {}
