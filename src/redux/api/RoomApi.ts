import { IHotel, IMeta } from "@/types";
import { TagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const ROOMS_URL = "/rooms";

export const roomApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createRoom: build.mutation({
      query: (Data) => ({
        url: `${ROOMS_URL}`,
        method: "POST",
        data: Data,
      }),
      invalidatesTags: [TagTypes.room],
    }),

    getAllRoom: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${ROOMS_URL}`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: IHotel[], meta: IMeta[]) => {
        return {
          room: response,
          meta,
        };
      },
      providesTags: [TagTypes.room],
    }),

    getSingleRoom: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${ROOMS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [TagTypes.room],
    }),

    updatedRoom: build.mutation({
      query: (Data) => ({
        url: `${ROOMS_URL}/${Data.id}`,
        method: "PATCH",
        data: Data.values,
      }),
      invalidatesTags: [TagTypes.room],
    }),

    deleteRoom: build.mutation({
      query: (id: string | string[] | undefined) => ({
        url: `${ROOMS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TagTypes.room],
    }),
  }),
});

export const {
    useCreateRoomMutation,
    useGetAllRoomQuery,
    useGetSingleRoomQuery,
    useUpdatedRoomMutation,
    useDeleteRoomMutation
} = roomApi;
