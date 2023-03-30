import { DefaultDto } from "@types";

export interface SystemProgramFn extends DefaultDto {
  key: string;
  label: string;
}

export interface User {
  userNm: string;
  userCd: string;
  timeZone: number;
  programList: string[];
  locale: string;
  authorityList: string[];
  email: string;
  compCd: string;
}

export interface SignInRequest {
  userCd?: string;
  userPs?: string;
}

export interface SignInResponse {
  rs: User;
}

export interface GetProgramFnRequest {
  progCd?: string;
  apiUrl?: string;
}

export interface GetProgramFnResponse {
  ds: SystemProgramFn[];
}

export interface PutChangePwRequest {
  userPs?: string;
  userOldPs?: string;
}

export interface PutChangePwResponse {}

export abstract class UserRepositoryInterface {
  abstract signIn(params: SignInRequest): Promise<SignInResponse>;
  abstract signOut(): Promise<void>;
  abstract getProgramFn(params: GetProgramFnRequest): Promise<GetProgramFnResponse>;
  abstract putChangePw(params: PutChangePwRequest): Promise<PutChangePwResponse>;
}
