import { AggregateRoot } from '../entities/aggregate-root.js'
import type { UniqueEntityId } from '../entities/unique-entity-id.js'
import type { DomainEvent } from './domain-event.js'
import { DomainEvents } from './domain-events.js'

class CustomAggregateCreated implements DomainEvent {
  public ocurredAt: Date
  private aggregate: CustomAggregate // eslint-disable-line no-use-before-define

  constructor(aggregate: CustomAggregate) {
    this.aggregate = aggregate
    this.ocurredAt = new Date()
  }

  public getAggregateId(): UniqueEntityId {
    return this.aggregate.id
  }
}

class CustomAggregate extends AggregateRoot<null> {
  static create() {
    const aggregate = new CustomAggregate(null)

    aggregate.addDomainEvent(new CustomAggregateCreated(aggregate))

    return aggregate
  }
}

describe('Domain Events', () => {
  it('should be able to dispatch and listen to events', () => {
    const callbackSpy = vi.fn()

    // Subscriber cadastrado (ouvindo o evento de "agregado criado")
    DomainEvents.register(callbackSpy, CustomAggregateCreated.name)

    // Criando o agregado, porém SEM salvar no banco
    const aggregate = CustomAggregate.create()

    // O evento foi criado, porém NÃO foi disparado
    expect(aggregate.domainEvents).toHaveLength(1)

    // Salvando o agregado no banco de dados e assim disparando o evento
    DomainEvents.dispatchEventsForAggregate(aggregate.id)

    // O subscriber ouve o evento e faz o que precisa ser feito com o dado
    expect(callbackSpy).toHaveBeenCalled()
    expect(aggregate.domainEvents).toHaveLength(0)
  })
})
