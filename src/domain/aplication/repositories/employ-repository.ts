import type { Employ } from "@/domain/enterprise/entities/employ";
export interface EmployRepository {
    create(employ: Employ): Promise<Employ>
}