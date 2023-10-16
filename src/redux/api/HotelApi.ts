import { IHotel, IMeta } from "@/types";
import { TagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const HOTELS_URL = "/hotels";

export const hotelApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createHotel: build.mutation({
      query: (Data) => ({
        url: `${HOTELS_URL}`,
        method: "POST",
        data: Data,
      }),
      invalidatesTags: [TagTypes.hotel],
    }),

    getAllHotel: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${HOTELS_URL}`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: IHotel[], meta: IMeta[]) => {
        return {
          hotel: response,
          meta,
        };
      },
      providesTags: [TagTypes.hotel],
    }),

    getSingleHotel: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${HOTELS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [TagTypes.hotel],
    }),

    updatedHotel: build.mutation({
      query: (Data) => ({
        url: `${HOTELS_URL}/${Data.id}`,
        method: "PATCH",
        data: Data.values,
      }),
      invalidatesTags: [TagTypes.hotel],
    }),

    deleteHotel: build.mutation({
      query: (id: string | string[] | undefined) => ({
        url: `${HOTELS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TagTypes.hotel],
    }),
  }),
});

export const {
  useCreateHotelMutation,
  useGetAllHotelQuery,
  useGetSingleHotelQuery,
  useUpdatedHotelMutation,
  useDeleteHotelMutation,
} = hotelApi;
