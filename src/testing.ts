import * as request from "supertest";
import { INestApplication } from "@nestjs/common";

export const getToken = (): string => {
  return `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDE4MDNhMTNkYjQ5MDAwNDM3MzU2NjgiLCJ1c2VybmFtZSI6Im1ib3JnbyIsInJvbGVzIjpbeyJhcHBJZCI6IjVlNzI2ZDg1MDk2NTg3MDAzMGE1Nzk1NiIsImFwcE5hbWUiOiJtb2R1bG9icG0iLCJwZXJtaXNzaW9ucyI6W3siZWxlbWVudCI6eyJuYW1lIjoiVG9kb3MgbG9zIEVsZW1lbnRvcyJ9LCJjb21wb25lbnRJZCI6IjVlNzI2ZDg1MDk2NTg3MDAzMGE1Nzk1NyIsInBlcm1pc3Npb24iOnRydWUsImNvbXBvbmVudE5hbWUiOiJUb2RvcyBsb3MgQ29tcG9uZW50ZXMifV0sInJvbGUiOiJCUE0gQWRtaW4iLCJjcmVhdGVkQXQiOiIyMDIwLTAzLTA0VDEzOjUyOjA4LjA3MCswMzAwIiwiaWQiOiI1ZTcyNmQ4NTQ0N2U5OTAwNDRkNTAzYzYiLCJ1cGRhdGVkQXQiOiIyMDIwLTAzLTA0VDEzOjUyOjA4LjA3MSswMzAwIn0seyJhcHBJZCI6IjVlYWI4MGE1NzVjYjQwODc2MWMzNzI4ZiIsImFwcE5hbWUiOiJtb2R1bG9hZG1pbiIsInBlcm1pc3Npb25zIjpbeyJlbGVtZW50Ijp7Im5hbWUiOiJUb2RvcyBsb3MgZWxlbWVudG9zIn0sImNvbXBvbmVudElkIjoiNWVhYjgwZmU3NWNiNDA4NzYxYzM3MzkyIiwicGVybWlzc2lvbiI6dHJ1ZSwiY29tcG9uZW50TmFtZSI6IlRvZG9zIGxvcyBDb21wb25lbnRlcyJ9LHsiZWxlbWVudCI6eyJuYW1lIjoiQ29uZmlndXJhciBtYW51YWwifSwiY29tcG9uZW50SWQiOiI2MjBlNzdmODg2MjY0MGI0MmQ0NTlkMjciLCJwZXJtaXNzaW9uIjp0cnVlLCJjb21wb25lbnROYW1lIjoiT3BjaW9uZXMifV0sInJvbGUiOiJBZG1pbmlzdHJhdG9yIEFkbWluIiwiY3JlYXRlZEF0IjoiMjAyMC0wNC0yNFQxNTo0Mjo1My43MDUrMDMwMCIsImlkIjoiNWVhYjgxNTA3NWNiNDA4NzYxYzM3NDViIiwidXBkYXRlZEF0IjoiMjAyMC0wNC0yNFQxNTo0Mjo1My43MDUrMDMwMCJ9LHsiYXBwSWQiOiI1ZWFiODJiMjVkZGJiYTAwMmUxODRkYzQiLCJhcHBOYW1lIjoibW9kdWxvZGFzaGJvYXJkIiwicGVybWlzc2lvbnMiOlt7ImVsZW1lbnQiOnsibmFtZSI6IlRvZG9zIGxvcyBlbGVtZW50b3MifSwiY29tcG9uZW50SWQiOiI1ZWFiODJiMjVkZGJiYTAwMmUxODRkYzUiLCJwZXJtaXNzaW9uIjp0cnVlLCJjb21wb25lbnROYW1lIjoiVG9kb3MgbG9zIENvbXBvbmVudGVzIn0seyJlbGVtZW50Ijp7Im5hbWUiOiJQb3JjZW50YWplcyJ9LCJjb21wb25lbnRJZCI6IjYxYmJhMWQ2MjdkMWQwMTI2YjVmNzVmMCIsInBlcm1pc3Npb24iOnRydWUsImNvbXBvbmVudE5hbWUiOiJDb25maWd1cmFjaW9uZXMifSx7ImVsZW1lbnQiOnsibmFtZSI6IlJlc3RhdXJhciJ9LCJjb21wb25lbnRJZCI6IjYxYmJhMWQ2MjdkMWQwMTI2YjVmNzVmMCIsInBlcm1pc3Npb24iOnRydWUsImNvbXBvbmVudE5hbWUiOiJDb25maWd1cmFjaW9uZXMifV0sInJvbGUiOiJEYXNoYm9hcmQgQWRtaW4iLCJjcmVhdGVkQXQiOiIyMDIwLTA1LTAxVDAwOjM4OjM0LjE5MiswMzAwIiwiaWQiOiI1ZWFiODJiMjEyMzE0NTAwNDM3ZWUwOTkiLCJ1cGRhdGVkQXQiOiIyMDIwLTA1LTAxVDAwOjM4OjM0LjE5MyswMzAwIn0seyJhcHBJZCI6IjVlZDgwMjBhNWRkYmJhMDAyZTE4NGRjNyIsImFwcE5hbWUiOiJtb2R1bG9ldmVudG9zIiwicGVybWlzc2lvbnMiOlt7ImVsZW1lbnQiOnsibmFtZSI6IlRvZG9zIGxvcyBlbGVtZW50b3MifSwiY29tcG9uZW50SWQiOiI1ZWQ4MDIwYjVkZGJiYTAwMmUxODRkYzgiLCJwZXJtaXNzaW9uIjp0cnVlLCJjb21wb25lbnROYW1lIjoiVG9kb3MgbG9zIENvbXBvbmVudGVzIn1dLCJyb2xlIjoiRXZlbnRvcyBBZG1pbiIsImNyZWF0ZWRBdCI6IjIwMjAtMDYtMDNUMTk6MDM6MTkuMDc4KzAzMDAiLCJpZCI6IjVlZDgwMjBiMDVjZWI5MDA0M2Y5MTViNyIsInVwZGF0ZWRBdCI6IjIwMjAtMDYtMDNUMTk6MDM6MTkuMDc5KzAzMDAifSx7ImFwcElkIjoiNWYzM2Y5NjkxNzE0YTIwMDM4NjQ4YTUxIiwiYXBwTmFtZSI6Im1vZHVsb2VuY3Vlc3RhcyIsInBlcm1pc3Npb25zIjpbeyJlbGVtZW50Ijp7Im5hbWUiOiJUb2RvcyBsb3MgZWxlbWVudG9zIn0sImNvbXBvbmVudElkIjoiNWYzM2Y5NjkxNzE0YTIwMDM4NjQ4YTUyIiwicGVybWlzc2lvbiI6dHJ1ZSwiY29tcG9uZW50TmFtZSI6IlRvZG9zIGxvcyBDb21wb25lbnRlcyJ9XSwicm9sZSI6IlN1cnZleSBBZG1pbiIsImNyZWF0ZWRBdCI6IjIwMjAtMDgtMTFUMTM6MDQ6MTYuMTgxKzAzMDAiLCJpZCI6IjVmMzNmOTY5MjY1MzQ1MDA0NDRmNzMyOSIsInVwZGF0ZWRBdCI6IjIwMjAtMDgtMTFUMTM6MDQ6MTYuMTgyKzAzMDAifSx7ImFwcElkIjoiNWYzM2Y5OTExNzE0YTIwMDM4NjQ4YTUzIiwiYXBwTmFtZSI6Im1vZHVsb2VudGlkYWRlcyIsInBlcm1pc3Npb25zIjpbeyJlbGVtZW50Ijp7Im5hbWUiOiJUb2RvcyBsb3MgZWxlbWVudG9zIn0sImNvbXBvbmVudElkIjoiNWYzM2Y5OTExNzE0YTIwMDM4NjQ4YTU0IiwicGVybWlzc2lvbiI6dHJ1ZSwiY29tcG9uZW50TmFtZSI6IlRvZG9zIGxvcyBDb21wb25lbnRlcyJ9XSwicm9sZSI6IkVudGl0eSBBZG1pbiIsImNyZWF0ZWRBdCI6IjIwMjAtMDgtMTFUMTM6MDQ6MTYuMTgxKzAzMDAiLCJpZCI6IjVmMzNmOTkxMjY1MzQ1MDA0NDRmNzMyYiIsInVwZGF0ZWRBdCI6IjIwMjAtMDgtMTFUMTM6MDQ6MTYuMTgyKzAzMDAifSx7ImFwcElkIjoiNjAxODBjYmRkNmExYjAwMDJlOTc4MjM1IiwiYXBwTmFtZSI6Im1vZHVsb2FjdGl2aWRhZGVzIiwicGVybWlzc2lvbnMiOlt7ImVsZW1lbnQiOnsibmFtZSI6IlRvZG9zIGxvcyBlbGVtZW50b3MifSwiY29tcG9uZW50SWQiOiI2MDE4MGNiZWQ2YTFiMDAwMmU5NzgyMzYiLCJwZXJtaXNzaW9uIjp0cnVlLCJjb21wb25lbnROYW1lIjoiVG9kb3MgbG9zIENvbXBvbmVudGVzIn1dLCJyb2xlIjoiQWN0aXZpdHkgQWRtaW4iLCJjcmVhdGVkQXQiOiIyMDIxLTAxLTI5VDE0OjI3OjQ3LjUzNiswMzAwIiwiaWQiOiI2MDE4MGNiZTNkYjQ5MDAwNDM3MzU3OGQiLCJ1cGRhdGVkQXQiOiIyMDIxLTAxLTI5VDE0OjI3OjQ3LjUzNyswMzAwIn0seyJhcHBJZCI6IjYwMTgwY2QwZDZhMWIwMDAyZTk3ODIzNyIsImFwcE5hbWUiOiJtb2R1bG9jb25mZXJlbmNpYSIsInBlcm1pc3Npb25zIjpbeyJlbGVtZW50Ijp7Im5hbWUiOiJUb2RvcyBsb3MgZWxlbWVudG9zIn0sImNvbXBvbmVudElkIjoiNjAxODBjZDBkNmExYjAwMDJlOTc4MjM4IiwicGVybWlzc2lvbiI6dHJ1ZSwiY29tcG9uZW50TmFtZSI6IlRvZG9zIGxvcyBDb21wb25lbnRlcyJ9XSwicm9sZSI6Ik1lZXRpbmcgQWRtaW4iLCJjcmVhdGVkQXQiOiIyMDIxLTAxLTI5VDE0OjI3OjQ3LjUzNiswMzAwIiwiaWQiOiI2MDE4MGNkMDNkYjQ5MDAwNDM3MzU3OTgiLCJ1cGRhdGVkQXQiOiIyMDIxLTAxLTI5VDE0OjI3OjQ3LjUzNyswMzAwIn0seyJhcHBJZCI6IjYxMjY0MmRkODJlZmNlOGI4M2UyOWNjMSIsImFwcE5hbWUiOiJtb2R1bG9jb21wcmFzIiwicGVybWlzc2lvbnMiOlt7ImVsZW1lbnQiOnsibmFtZSI6IlRvZG9zIGxvcyBFbGVtZW50b3MifSwiY29tcG9uZW50SWQiOiI2MjMzYTQ3ZDVjMjVkZDc4NTRmMWZhYjYiLCJwZXJtaXNzaW9uIjp0cnVlLCJjb21wb25lbnROYW1lIjoiVG9kb3MgbG9zIENvbXBvbmVudGVzIn1dLCJyb2xlIjoiQ29tcHJhcyBBZG1pbiIsImNyZWF0ZWRBdCI6IjIwMjEtMDgtMjRUMTQ6MzA6MTMuMTI1KzAzMDAiLCJpZCI6IjYxMjY0NTI2YzI5M2ZmMDA0NGU4N2YyYSIsInVwZGF0ZWRBdCI6IjIwMjItMDUtMTdUMTg6MjE6NTkuMjgzKzAzMDAifSx7ImFwcElkIjoiNjIwMTYwN2U4NjI2NDBiNDJkMTg0ZTkwIiwiYXBwTmFtZSI6Im1vZHVsb3Bva2VyIiwicGVybWlzc2lvbnMiOlt7ImVsZW1lbnQiOnsibmFtZSI6IlRvZG9zIGxvcyBFbGVtZW50b3MifSwiY29tcG9uZW50SWQiOiI2MjAxNjIwNjg2MjY0MGI0MmQxODU1ODQiLCJwZXJtaXNzaW9uIjp0cnVlLCJjb21wb25lbnROYW1lIjoiVG9kb3MgbG9zIENvbXBvbmVudGVzIn1dLCJyb2xlIjoiR2FtYml0byIsImNyZWF0ZWRBdCI6IjIwMjAtMDMtMDRUMTM6NTI6MDguMDcwKzAzMDAiLCJpZCI6IjYyMDE2MWUzODYyNjQwYjQyZDE4NTUwMiIsInVwZGF0ZWRBdCI6IjIwMjAtMDMtMDRUMTM6NTI6MDguMDcxKzAzMDAifSx7ImFwcElkIjoiNjI3MDRkNTUxYTVkNzM3ZGE1OTU4NjA4IiwiYXBwTmFtZSI6Im1vZHVsb21vbml0b3IiLCJwZXJtaXNzaW9ucyI6W3siZWxlbWVudCI6eyJuYW1lIjoiVG9kb3MgbG9zIEVsZW1lbnRvcyJ9LCJjb21wb25lbnRJZCI6IjYyNzA0ZTEwMWE1ZDczN2RhNTk1ODljOSIsInBlcm1pc3Npb24iOnRydWUsImNvbXBvbmVudE5hbWUiOiJUb2RvcyBsb3MgQ29tcG9uZW50ZXMifV0sInJvbGUiOiJNb25pdG9yIEFkbWluIiwiY3JlYXRlZEF0IjoiMjAyMi0wNC0yNVQxNDowNTowNC43ODYrMDMwMCIsImlkIjoiNjI3MDRlMzExYTVkNzM3ZGE1OTU4YTZlIiwidXBkYXRlZEF0IjoiMjAyMi0wNC0yNVQxNDowNTowNC43ODYrMDMwMCJ9XSwiaWF0IjoxNjU1NDgwNDg2LCJleHAiOjE5NzA4NDA0ODZ9.WL7G2JM5hIuEAxk_1o-fGoW657sAoDQLYHaN_vmSsnUrcczSZ9O1wGkKDqK15-PCn3qCv_yX3GZuTV0-7bFC8v3_NFykYlCNmE81-M4a4DPuWenKKbKt-Ir4hKJe-qFNZz-MVwHl2-y2tsMx7u2kmFPDp4wR1fA18oWPauKmaQo`;
};

export interface TestEndpoint {
  name: string;
  function: (done: any) => void;
}

export type FunctionTestApp = () => INestApplication;

export const basicget = (
  onApp: FunctionTestApp,
  done1: any,
  url: string,
  _body: any = {}
) => {
  const token = getToken();
  const app = onApp();
  request(app.getHttpServer())
    .get(url)
    .set("Authorization", "Bearer " + token)
    // .expect(200)
    .end((err: any, _response: any) => {
      if (err) {
        done1(err);
      } else {
        done1();
      }
    });
};

export const basicpost = (
  onApp: FunctionTestApp,
  done2: any,
  url: string,
  body: any = {}
) => {
  const token = getToken();
  const app = onApp();
  request(app.getHttpServer())
    .post(url)
    .set("Authorization", "Bearer " + token)
    // .expect(200)
    .send(body)
    .end((err: any, _response: any) => {
      if (err) {
        done2(err);
      } else {
        done2();
      }
    });
};

export const basicput = (
  onApp: FunctionTestApp,
  done3: any,
  url: string,
  body: any = {}
) => {
  const token = getToken();
  const app = onApp();
  request(app.getHttpServer())
    .put(url)
    .set("Authorization", "Bearer " + token)
    // .expect(200)
    .send(body)
    .end((err: any, _response: any) => {
      if (err) {
        done3(err);
      } else {
        done3();
      }
    });
};

export const basicdelete = (
  onApp: FunctionTestApp,
  done4: any,
  url: string,
  body: any = {}
) => {
  const token = getToken();
  const app = onApp();
  request(app.getHttpServer())
    .delete(url)
    .set("Authorization", "Bearer " + token)
    // .expect(200)
    .send(body)
    .end((err: any, _response: any) => {
      if (err) {
        done4(err);
      } else {
        done4();
      }
    });
};
