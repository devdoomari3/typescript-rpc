import {
  createAPIDefinition,
} from '../../src/createAPI';
import {
  BaseRequestType,
  BaseResponseType,
} from '../../src/types';

export type UserId = string & {
  __UserId: null;
};

export type UserPointRequestType = {
  userId: UserId;
} & BaseRequestType;

export type UserPointResponseType = {
  userId: UserId;
  points: number;
} & BaseResponseType;

export const getUserPointAPI = createAPIDefinition<
  UserPointRequestType,
  UserPointResponseType
>()('userPointAPI');

export type UserProfileUpdateRequestType = {
  userId: UserId;
  imgFile: File;
} & BaseRequestType;

export type UserProfileUpdateResponseType = {
  userId: UserId;
} & BaseResponseType;

export const updateUserProfileAPI = createAPIDefinition<
  UserProfileUpdateRequestType,
  UserProfileUpdateResponseType
>()('updateUserProfile');
