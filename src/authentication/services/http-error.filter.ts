import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  Logger,
  HttpStatus,
  HttpException,
} from "@nestjs/common";

@Catch(HttpException)
export class HttpErrorFilter implements ExceptionFilter {
  catch(error: any, host: ArgumentsHost) {
    const ctx = host?.switchToHttp();
    const request = ctx?.getRequest();
    const response = ctx?.getResponse();

    if (!response) {
      return;
    }

    const status = error?.getStatus() || 0;
    if (error && status >= HttpStatus.AMBIGUOUS) {
      if (typeof error.response !== "string") {
        // tslint:disable-next-line: no-string-literal
        error.response["message"] =
          error.response.message ||
          "You do not have permissions to access this resource";
      }
    }

    const errorResponse = {
      statusCode: status,
      error: error?.response?.name || error?.name || "unknown",
      message: error?.response?.message || error?.message || null,
      errors: error?.response?.errors || null,
      timestamp: new Date().toLocaleDateString(),
      path: request ? request.url : null,
      method: request ? request.method : null,
    };

    Logger.error(
      `${request?.method || ""} ${request?.url || ""}`,
      JSON.stringify(errorResponse),
      "ExceptionFilter",
      false
    );

    response.status(status).json(errorResponse);
  }
}
