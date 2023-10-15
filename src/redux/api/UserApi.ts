import { IMeta, IUser } from "@/types";
import { TagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const USERS_URL = "/profile";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllAdmin: build.query({
      query: () => ({
        url: `/users/admins`,
        method: "GET",
      }),
      providesTags: [TagTypes.user, TagTypes.admin, TagTypes.super_admin],
    }),

    getAllProfile: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${USERS_URL}`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: IUser[], meta: IMeta[]) => {
        return {
          users: response,
          meta,
        };
      },
      providesTags: [TagTypes.user, TagTypes.admin, TagTypes.super_admin],
    }),

    getSingleUser: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${USERS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [TagTypes.user, TagTypes.admin, TagTypes.super_admin],
    }),

    getProfile: build.query({
      query: () => ({
        url: `${USERS_URL}/user-profile`,
        method: "GET",
      }),
      providesTags: [TagTypes.user, TagTypes.admin, TagTypes.super_admin],
    }),

    profileUpdate: build.mutation({
      query: (Data) => ({
        url: `${USERS_URL}`,
        method: "PATCH",
        data: Data,
      }),
      invalidatesTags: [TagTypes.user, TagTypes.admin, TagTypes.super_admin],
    }),

    changeRole: build.mutation({
      query: (Data) => ({
        url: `${USERS_URL}/${Data.id}`,
        method: "PATCH",
        data: Data.values,
      }),
      invalidatesTags: [TagTypes.user, TagTypes.admin, TagTypes.super_admin],
    }),
  }),
});

export const {
  useGetAllAdminQuery,
  useGetAllProfileQuery,
  useGetSingleUserQuery,
  useGetProfileQuery,
  useProfileUpdateMutation,
  useChangeRoleMutation,
} = profileApi;
