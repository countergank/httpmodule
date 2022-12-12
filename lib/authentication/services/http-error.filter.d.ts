import { ExceptionFilter, ArgumentsHost } from "@nestjs/common";
export declare class HttpErrorFilter implements ExceptionFilter {
    catch(error: any, host: ArgumentsHost): void;
}
