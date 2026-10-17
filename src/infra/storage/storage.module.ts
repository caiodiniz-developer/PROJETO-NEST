import { Module } from '@nestjs/common'
import { Uploader } from '../../domain/forum/application/storage/uploader.js'
import { EnvModule } from '../env/env.module.js'
import { R2Storage } from './r2-storage.js'

@Module({
  imports: [EnvModule],
  providers: [
    {
      provide: Uploader,
      useClass: R2Storage,
    },
  ],
  exports: [Uploader],
})
export class StorageModule {}
