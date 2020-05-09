export enum Status {
  Success,
  Failure
}
export interface IImageProcessModel {
  status: Status;
  message: string;
  outputText: string;
  loading: boolean;
}
