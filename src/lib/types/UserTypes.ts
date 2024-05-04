export type UserType = {
  name: string;
  age: number;
  breed: string;
  gender: string;
  id: string;
  imageUrl: string;
  inWork: string;
  outWork: string;
  position: string;
  workDate: string;
};

export interface UserContextType {}

export interface DogType {
  id: string;
}

export interface FileType {
  name: string;
}

export enum UploadStatusType {
  PAUSED = 'paused',
  RUNNING = 'running',
  SUCCESS = 'success',
  ERROR = 'error',
}
