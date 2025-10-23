import { UseCaseError } from "@/core/errors/use-case-error";

export class InvalidFileError extends Error implements UseCaseError{
    constructor(type: string){
        super(`${type} is Invalid File`)
    }
}