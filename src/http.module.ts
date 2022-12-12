import { HttpModule, HttpService } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { HTTPService } from "./http.service";

@Module({
  imports: [HttpModule],
  providers: [HTTPService, HttpService],
  exports: [HTTPService, HttpService],
})
export class HTTPModule {}
