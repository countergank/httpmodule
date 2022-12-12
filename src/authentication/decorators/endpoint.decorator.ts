import { applyDecorators, HttpStatus } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { OperationObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { ApiException } from "../api-exception.model";

export function EndPointResponse(options: Partial<OperationObject>) {
  return applyDecorators(
    ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException }),
    ApiResponse({ status: HttpStatus.NOT_FOUND, type: ApiException }),
    ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: ApiException }),
    ApiOperation(options)
  );
}
