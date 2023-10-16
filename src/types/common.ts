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
  data?: any;
  meta?: any;
}

export interface IDistrict {
  data?: any;
  meta?: any;
}

export interface IPlace {
  data?: any;
  meta?: any;
}

export interface IHotel {
  data?: any;
  meta?: any;
}
