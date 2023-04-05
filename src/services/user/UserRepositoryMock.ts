import { delay } from "@core/utils/thread/timing";
import {
  GetProgramFnRequest,
  GetProgramFnResponse,
  PutChangePwRequest,
  PutChangePwResponse,
  SignInRequest,
  SignInResponse,
  UserRepositoryInterface,
} from "./UserRepositoryInterface";
import { setApiHeader } from "../apiWrapper";
import { setAppData } from "../../@core/utils/store";
import pkg from "../../../package.json";
import { v4 as uuidv4 } from "uuid";

export class UserRepositoryMock implements UserRepositoryInterface {
  async signIn(params: SignInRequest): Promise<SignInResponse> {
    await delay(300);

    const headers = {
      authorization: uuidv4(),
      token: uuidv4(),
    };

    setApiHeader(headers.authorization);
    setAppData({
      name: pkg.name,
      version: pkg.version,
      authorization: headers.authorization,
      token: headers.token ?? "",
    });

    return {
      rs: {
        userNm: "시스템사용자",
        userCd: "system",
        timeZone: 9,
        locale: "en",
        authorityList: ["ROLE_ADMIN", "ROLE_ASP", "ROLE_USER"],
        programList: [
          "EXAMPLE_DETAIL",
          "EXAMPLE_FORM",
          "EXAMPLE_LIST",
          "EXAMPLE_LIST_AND_DRAWER",
          "EXAMPLE_LIST_AND_MODAL",
          "EXAMPLE_LIST_WITH_FORM",
          "EXAMPLE_LIST_WITH_FORM_ROW",
          "EXAMPLE_LIST_WITH_FORM_LIST",
          "EXAMPLE_LIST_WITH_LIST",
          "EXAMPLE_THREE_LIST",
          "EXAMPLE_STATS",
        ],
        email: "jikook71@naver.com",
        compCd: "V100",
      },
    };
  }

  signOut(): Promise<void> {
    return Promise.resolve(undefined);

    // await apiWrapper<SignInResponse>("get", "/v1/users/logout", {}, { ignoreError: true });
    // return;
  }

  async getProgramFn(params: GetProgramFnRequest): Promise<GetProgramFnResponse> {
    await delay(100);
    return {
      ds: ["fn01", "fn02", "fn03", "fn04"],
    };
  }

  async putChangePw(params: PutChangePwRequest): Promise<PutChangePwResponse> {
    await delay(300);
    return {};
  }
}
