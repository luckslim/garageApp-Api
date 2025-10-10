import type { EmployRepository } from "@/domain/aplication/repositories/employ-repository";
import type { Employ } from "@/domain/enterprise/entities/employ";

export class InMemoryEmployRepository implements EmployRepository{
    public items : Employ[] = []
    async create(employ: Employ){
        this.items.push(employ)
        return employ
    }
}