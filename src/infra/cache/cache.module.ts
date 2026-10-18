import { Module } from '@nestjs/common'
import { EnvModule } from '../env/env.module.js'
import { CacheRepository } from './cache-repository.js'
import { RedisCacheRepository } from './redis/redis-cache-repository.js'
import { RedisService } from './redis/redis.service.js'

@Module({
  imports: [EnvModule],
  providers: [
    RedisService,
    {
      provide: CacheRepository,
      useClass: RedisCacheRepository,
    },
  ],
  exports: [CacheRepository],
})
export class CacheModule {}
