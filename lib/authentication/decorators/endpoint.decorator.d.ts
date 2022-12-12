import { OperationObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
export declare function EndPointResponse(options: Partial<OperationObject>): <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol | undefined, descriptor?: TypedPropertyDescriptor<Y> | undefined) => void;
