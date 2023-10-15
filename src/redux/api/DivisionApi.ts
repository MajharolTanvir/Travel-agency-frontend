import { IDivision, IMeta } from "@/types";
import { TagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const DIVISION_URL = "/divisions";

export const divisionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createDivision: build.mutation({
      query: (Data) => ({
        url: `${DIVISION_URL}`,
        method: "POST",
        data: Data,
      }),
      invalidatesTags: [TagTypes.division],
    }),

    getAllDivision: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${DIVISION_URL}`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: IDivision[], meta: IMeta[]) => {
        return {
          division: response,
          meta,
        };
      },
      providesTags: [TagTypes.division],
    }),

    getSingleDivision: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${DIVISION_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [TagTypes.division],
    }),

    divisionUpdate: build.mutation({
      query: (Data) => ({
        url: `${DIVISION_URL}/${Data.id}`,
        method: "PATCH",
        data: Data.values,
      }),
      invalidatesTags: [TagTypes.division],
    }),

    deleteDivision: build.mutation({
      query: (id: string | string[] | undefined) => ({
        url: `${DIVISION_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TagTypes.division],
    }),
  }),
});

export const {
    useCreateDivisionMutation,
    useGetAllDivisionQuery,
    useGetSingleDivisionQuery,
    useDivisionUpdateMutation,
    useDeleteDivisionMutation
} = divisionApi;
