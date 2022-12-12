/* tslint:disable:max-classes-per-file */

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class JwtPayload {
  @ApiProperty({ default: "" })
  userId!: string;

  @ApiProperty({ default: "" })
  username!: string;

  @ApiProperty({ default: [], isArray: true })
  roles!: UserRole[];

  @ApiPropertyOptional()
  iat?: Date;
}

export class UserRole {
  @ApiPropertyOptional()
  id?: string;

  @ApiPropertyOptional()
  _id?: string;

  @ApiPropertyOptional()
  createdAt?: string;

  @ApiPropertyOptional()
  updatedAt?: string;

  @ApiProperty({ default: "" })
  role!: string;

  @ApiProperty({ default: [], isArray: true })
  permissions!: ElementPermission[];

  @ApiProperty({ default: "" })
  appId!: string;

  @ApiPropertyOptional()
  appName?: string;
}

export class UserRoleVM extends UserRole {
  @ApiProperty()
  appName!: string;
}

export class ElementPermission {
  @ApiProperty()
  element!: ComponentElement;

  @ApiProperty({ default: "" })
  componentId!: string;

  @ApiProperty({ default: false })
  permission!: boolean;

  @ApiProperty({ default: "" })
  componentName?: string;
}

export interface ComponentElement {
  name: string;
  description?: string;
}
