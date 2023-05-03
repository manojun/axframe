import {
  AppRepositoryInterface,
  GetAppMenuRequest,
  GetAppMenuResponse,
  GetProgramAuthorityRequest,
  GetProgramAuthorityResponse,
} from "./AppRepositoryInterface";
import { delay } from "../../@core/utils/thread/timing";

export class AppRepositoryMock extends AppRepositoryInterface {
  async getAppMenu(params: GetAppMenuRequest): Promise<GetAppMenuResponse> {
    await delay(500);

    return {
      ds: [
        {
          menuGrpCd: "EXAMPLE",
          multiLanguage: {
            ko: "예제",
            en: "EXAMPLE",
          },
          iconTy: "Template",
          children: [
            {
              multiLanguage: {
                en: "FORM",
                ko: "FORM",
              },
              iconTy: "Template",
              level: 1,
              sort: 0,
              progCd: "EXAMPLE_FORM",
              children: [],
            },
            {
              multiLanguage: {
                en: "LIST",
                ko: "LIST",
              },
              iconTy: "Template",
              level: 1,
              sort: 1,
              progCd: "EXAMPLE_LIST",
              children: [],
            },
            {
              multiLanguage: {
                en: "LIST&DRAWER",
                ko: "LIST&DRAWER",
              },
              iconTy: "Template",
              level: 1,
              sort: 2,
              progCd: "EXAMPLE_LIST_AND_DRAWER",
              children: [],
            },
            {
              multiLanguage: {
                en: "LIST&MODAL",
                ko: "LIST&MODAL",
              },
              iconTy: "Template",
              level: 1,
              sort: 3,
              progCd: "EXAMPLE_LIST_AND_MODAL",
              children: [],
            },
            {
              multiLanguage: {
                en: "LIST&FORM",
                ko: "LIST&FORM",
              },
              iconTy: "Template",
              level: 1,
              sort: 4,
              progCd: "EXAMPLE_LIST_WITH_FORM",
              children: [],
            },
            {
              multiLanguage: {
                en: "LIST&FORM-LIST",
                ko: "LIST&FORM-LIST",
              },
              iconTy: "Template",
              level: 1,
              sort: 5,
              progCd: "EXAMPLE_LIST_WITH_FORM_LIST",
              children: [],
            },
            {
              multiLanguage: {
                en: "LIST&LIST",
                ko: "LIST&LIST",
              },
              iconTy: "Template",
              level: 1,
              sort: 6,
              progCd: "EXAMPLE_LIST_WITH_LIST",
              children: [],
            },
            {
              multiLanguage: {
                en: "THREE_LIST",
                ko: "THREE_LIST",
              },
              iconTy: "Template",
              level: 1,
              sort: 7,
              progCd: "EXAMPLE_THREE_LIST",
              children: [],
            },
            {
              multiLanguage: {
                en: "STATS",
                ko: "STATS",
              },
              iconTy: "Template",
              level: 1,
              sort: 8,
              progCd: "EXAMPLE_STATS",
              children: [],
            },
          ],
          userGroup: ["ROLE_ADMIN"],
        },
      ],
    };
  }

  async getProgramAuthority(params: GetProgramAuthorityRequest): Promise<GetProgramAuthorityResponse> {
    return Promise.resolve({});
  }
}
