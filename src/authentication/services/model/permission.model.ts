import { ApiProperty } from "@nestjs/swagger";

export class PermissionInterface {
  @ApiProperty({ default: "" })
  application!: string;

  @ApiProperty({ default: "" })
  component!: string;

  @ApiProperty({ default: "" })
  element!: string;
}
