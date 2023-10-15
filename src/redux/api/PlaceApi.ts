import { IMeta, IPlace } from "@/types";
import { TagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const PLACE_URL = "/places";

export const placeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createPlace: build.mutation({
      query: (Data) => ({
        url: `${PLACE_URL}`,
        method: "POST",
        data: Data,
      }),
      invalidatesTags: [TagTypes.place],
    }),

    getAllPlace: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${PLACE_URL}`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: IPlace[], meta: IMeta[]) => {
        return {
          place: response,
          meta,
        };
      },
      providesTags: [TagTypes.place],
    }),

    getSinglePlace: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${PLACE_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [TagTypes.place],
    }),

    updatedPlace: build.mutation({
      query: (Data) => ({
        url: `${PLACE_URL}/${Data.id}`,
        method: "PATCH",
        data: Data.values,
      }),
      invalidatesTags: [TagTypes.place],
    }),

    deletePlace: build.mutation({
      query: (id: string | string[] | undefined) => ({
        url: `${PLACE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TagTypes.place],
    }),
  }),
});

export const {
  useCreatePlaceMutation,
  useGetAllPlaceQuery,
  useGetSinglePlaceQuery,
  useUpdatedPlaceMutation,
  useDeletePlaceMutation,
} = placeApi;
