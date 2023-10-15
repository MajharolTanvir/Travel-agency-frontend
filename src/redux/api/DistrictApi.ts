import { IDistrict, IMeta } from "@/types";
import { TagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const DISTRICT_URL = "/districts";

export const divisionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createDistrict: build.mutation({
      query: (Data) => ({
        url: `${DISTRICT_URL}`,
        method: "POST",
        data: Data,
      }),
      invalidatesTags: [TagTypes.district],
    }),

    getAllDistrict: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${DISTRICT_URL}`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: IDistrict[], meta: IMeta[]) => {
        return {
          district: response,
          meta,
        };
      },
      providesTags: [TagTypes.district],
    }),

    getSingleDistrict: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${DISTRICT_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [TagTypes.district],
    }),

    updatedDistrict: build.mutation({
      query: (Data) => ({
        url: `${DISTRICT_URL}/${Data.id}`,
        method: "PATCH",
        data: Data.values,
      }),
      invalidatesTags: [TagTypes.district],
    }),

    deleteDistrict: build.mutation({
      query: (id: string | string[] | undefined) => ({
        url: `${DISTRICT_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TagTypes.district],
    }),
  }),
});

export const {
    useCreateDistrictMutation,
    useGetAllDistrictQuery,
    useGetSingleDistrictQuery,
    useUpdatedDistrictMutation,
    useDeleteDistrictMutation
} = divisionApi;
