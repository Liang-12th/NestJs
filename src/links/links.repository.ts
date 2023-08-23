import { EntityRepository, Repository } from 'typeorm';
import { Link } from './link.entity';
import { CreateLinkDto } from './dto/create-link.dto';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Link)
export class LinksRepository extends Repository<Link> {
    async createLink(createLinkDto: CreateLinkDto): Promise<Link> {
        const { name, url } = createLinkDto;
        const link = this.create({
        name,
        url,
        });
        try {
            await this.save(link);            
        } catch (error) {
            if(error.code === '23505') {
                throw new ConflictException('short name is exists');
            }else{
                throw new InternalServerErrorException();
            }
        }

    
        return link;
    }
}