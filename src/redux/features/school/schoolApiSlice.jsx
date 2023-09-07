/* eslint-disable no-dupe-else-if */
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../api/apiSlice";

const schoolsAdapter = createEntityAdapter();

const initialState = schoolsAdapter.getInitialState();

export const schoolsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSchools: builder.query({
      query: (queryParams) => `/school?${queryParams}`,
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const loadedSchools = responseData.data.map((school) => {
          school.id = school._id;
          return school;
        });
        return schoolsAdapter.setAll(initialState, loadedSchools);
      },
      providesTags: (result) => {
        if (result?.ids) {
          return [
            { type: 'School', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'School', id }))
          ]
        } else return [{ type: 'School', id: 'LIST' }]
      }
    }),
    getSchoolInfo: builder.query({
      query: (queryParams) => {
        let url;

        if (queryParams.branch && queryParams.startDate && queryParams.endDate) {
          url = `/school?branch=${queryParams.branch}&startDate=${queryParams.startDate}&endDate=${queryParams.endDate}`;
        } else if (queryParams.branch && queryParams.startDate) {
          url = `/school?branch=${queryParams.branch}&startDate=${queryParams.startDate}`;
        } else if (queryParams.branch && queryParams.endDate) {
          url = `/school?branch=${queryParams.branch}&endDate=${queryParams.endDate}`;
        } else if (queryParams.startDate && queryParams.endDate) {
          url = `/school?startDate=${queryParams.startDate}&endDate=${queryParams.endDate}`;
        } else if (queryParams.branch) {
          url = `/school?branch=${queryParams.branch}`;
        } else if (queryParams.startDate) {
          url = `/school?startDate=${queryParams.startDate}`;
        } else if (queryParams.endDate) {
          url = `/school?endDate=${queryParams.endDate}`;
        } else {
          url = `/school`;
        }

        return { url }
      },
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        console.log(responseData)
        const loadedSchools = responseData.data.map((school) => {
          school.id = school._id;
          return school;
        });
        return schoolsAdapter.setAll(initialState, loadedSchools);
      },
    }),
    addNewSchool: builder.mutation({
      query: initialSchoolData => ({
        url: '/school',
        method: 'POST',
        body: {
          ...initialSchoolData,
        }
      }),
      invalidatesTags: [
        { type: 'School', id: "LIST" },
      ]
    }),
    updateSchool: builder.mutation({
      query: ({ id, body }) => ({
        url: `/school/${id}`,
        method: 'PATCH',
        body: {
          ...body
        }
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'School', id: arg.id },
      ]
    }),
    deleteSchool: builder.mutation({
      query: (id) => ({
        url: `/school/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'School', id: arg.id },
      ]
    }),
  }),
});

export const {
  useGetSchoolsQuery,
  useGetSchoolInfoQuery,
  useAddNewSchoolMutation,
  useUpdateSchoolMutation,
  useDeleteSchoolMutation,
} = schoolsApiSlice;

// Selectors

export const selectSchoolsResult = schoolsApiSlice.endpoints.getSchools.select();

// Creates memoized selector
export const selectSchools = createSelector(
  selectSchoolsResult,
  (schoolsResult) => schoolsResult.data // Normalized state object with ids and entities.
);

// getSelectors creates these selectors and we rename them with aliases using the object destructuring syntax.

export const {
  selectAll: selectAllSchools,
  selectById: selectSchoolById,
  selectIds: selectSchoolIds,

  //Pass in a selector that returns the schools slice of state
} = schoolsAdapter.getSelectors(state => selectSchools(state) ?? initialState);