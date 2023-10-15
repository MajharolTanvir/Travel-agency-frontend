export interface IMeta {
  limit?: number;
  page?: number;
  total?: number;
}

export type ResponseSuccessType = {
  data: any;
  meta?: IMeta;
};

export type ResponseErrorType = {
  statusCode: number;
  message?: string;
  errorMessages?: IGenericErrorMessage[];
};

type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

export type UserInfoProps = {
  userId?: string;
  userEmail?: string;
  role?: string;
};

export interface IUser {
  data?: any;
  meta?: any;
}

export interface IDivision {
  title: any;
  title: any;
  id: any;
  data?: any;
  meta?: any;
}

export interface IDistrict {
  data?: any;
  meta?: any;
}
