import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { LinksRepository } from './links.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Link } from './link.entity';
import { CreateLinkDto } from './dto/create-link.dto';
import { FindConditions } from 'typeorm/find-options/FindConditions';
import { UpdateLinkDto } from './dto/update-link.dto';
import { GetLinkDto } from './dto/get-link.dto';

@Injectable()
export class LinksService {
    linksRepository: LinksRepository;

    constructor(
        @InjectRepository(LinksRepository) linksRepository: LinksRepository
    ) {
            this.linksRepository = linksRepository;
    }
    // get all user
    async getAllLinks(): Promise<Array<Link>> {
        return this.linksRepository.find({ });
    }
    // create new user 
    async createLink(createLinkDto: CreateLinkDto): Promise<Link> {
        return this.linksRepository.createLink(createLinkDto);
    }
    // get user by id && error when not find user
    async getLink(conditions: FindConditions<Link>): Promise<Link> {
        const link= await this.linksRepository.findOne(conditions);
        if(!link) {
            throw new NotFoundException( );
        }
        return link;
    }
    //delete user by id && error when not find user
    async deleteLink(getLinkDto: GetLinkDto): Promise<void> {
        const {id} = getLinkDto
        const res = await this.linksRepository.delete({ id });
        if(res. affected ===0){
            throw new NotFoundException(`Link with ID: "${id}" not found`);
        }
    }
    // update user by id
    async updateLink(getLinkDto: GetLinkDto, updateLinkDto: UpdateLinkDto): Promise<Link> {
        const {id} = getLinkDto
        const link = await this.getLink({ id });
        const { name, url } = updateLinkDto;
        link.name = name;
        link.url = url;
        await this.linksRepository.save(link);
        return link;
    }
}
