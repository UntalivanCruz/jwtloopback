import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Regalos, RegalosRelations} from '../models';

export class RegalosRepository extends DefaultCrudRepository<
  Regalos,
  typeof Regalos.prototype.id,
  RegalosRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(Regalos, dataSource);
  }
}
