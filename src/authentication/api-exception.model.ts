import { HttpStatus } from "@nestjs/common";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ApiException {
  @ApiPropertyOptional({ default: HttpStatus.INTERNAL_SERVER_ERROR })
  statusCode?: number;

  @ApiPropertyOptional({ default: 500 })
  errorCode?: number;

  @ApiProperty({ default: "" })
  message!: string;

  @ApiPropertyOptional()
  status?: string;

  @ApiPropertyOptional()
  error?: string;

  @ApiPropertyOptional()
  errors?: any;

  @ApiPropertyOptional()
  timestamp?: string;

  @ApiPropertyOptional()
  path?: string;

  @ApiPropertyOptional()
  method?: string;
}
