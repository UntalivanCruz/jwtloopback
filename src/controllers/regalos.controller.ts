import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Regalos} from '../models';
import {RegalosRepository} from '../repositories';

@authenticate('jwt')
export class RegalosController {
  constructor(
    @repository(RegalosRepository)
    public regalosRepository: RegalosRepository,
  ) { }

  @post('/regalos')
  @response(200, {
    description: 'Regalos model instance',
    content: {'application/json': {schema: getModelSchemaRef(Regalos)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Regalos, {
            title: 'NewRegalos',
            exclude: ['id'],
          }),
        },
      },
    })
    regalos: Omit<Regalos, 'id'>,
  ): Promise<Regalos> {
    return this.regalosRepository.create(regalos);
  }

  @get('/regalos/count')
  @response(200, {
    description: 'Regalos model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Regalos) where?: Where<Regalos>,
  ): Promise<Count> {
    return this.regalosRepository.count(where);
  }

  @get('/regalos')
  @response(200, {
    description: 'Array of Regalos model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Regalos, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Regalos) filter?: Filter<Regalos>,
  ): Promise<Regalos[]> {
    return this.regalosRepository.find(filter);
  }

  @patch('/regalos')
  @response(200, {
    description: 'Regalos PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Regalos, {partial: true}),
        },
      },
    })
    regalos: Regalos,
    @param.where(Regalos) where?: Where<Regalos>,
  ): Promise<Count> {
    return this.regalosRepository.updateAll(regalos, where);
  }

  @get('/regalos/{id}')
  @response(200, {
    description: 'Regalos model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Regalos, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Regalos, {exclude: 'where'}) filter?: FilterExcludingWhere<Regalos>
  ): Promise<Regalos> {
    return this.regalosRepository.findById(id, filter);
  }

  @patch('/regalos/{id}')
  @response(204, {
    description: 'Regalos PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Regalos, {partial: true}),
        },
      },
    })
    regalos: Regalos,
  ): Promise<void> {
    await this.regalosRepository.updateById(id, regalos);
  }

  @put('/regalos/{id}')
  @response(204, {
    description: 'Regalos PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() regalos: Regalos,
  ): Promise<void> {
    await this.regalosRepository.replaceById(id, regalos);
  }

  @del('/regalos/{id}')
  @response(204, {
    description: 'Regalos DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.regalosRepository.deleteById(id);
  }
}
