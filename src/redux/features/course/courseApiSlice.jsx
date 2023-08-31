import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../api/apiSlice";

const coursesAdapter = createEntityAdapter();

const initialState = coursesAdapter.getInitialState();

export const coursesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: () => "/courses",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const loadedCourses = responseData.data.map((course) => {
          course.id = course._id;
          return course;
        });
        return coursesAdapter.setAll(initialState, loadedCourses);
      },
      providesTags: (result) => {
        if (result?.ids) {
          return [
            { type: 'Courses', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'Course', id }))
          ]
        } else return [{ type: 'Course', id: 'LIST' }]
      }
    }),
    getMyCourses: builder.query({
      query: () => "/courses/my-course",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      providesTags: (result) => {
        if (result?.ids) {
          return [
            { type: 'Course', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'Course', id }))
          ]
        } else return [{ type: 'Course', id: 'LIST' }]
      }
    }),
    addNewCourse: builder.mutation({
      query: initialCourseData => ({
        url: '/courses',
        method: 'POST',
        body: {
          ...initialCourseData,
        }
      }),
      invalidatesTags: [
        { type: 'Course', id: "LIST" },
      ]
    }),
    updateCourse: builder.mutation({
      query: ({ id, body }) => ({
        url: `/courses/${id}`,
        method: 'PATCH',
        body: {
          ...body,
        }
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Course', id: arg.id },
      ]
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/courses/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Course', id: arg.id },
      ]
    }),
    completeCourse: builder.mutation({
      query: () => ({
        url: `/courses/complete`,
        method: 'PATCH',
      }),
    })
  }),
});

export const {
  useGetCoursesQuery,
  useGetMyCoursesQuery,
  useAddNewCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
  useCompleteCourseMutation
} = coursesApiSlice;

// Selectors

export const selectCoursesResult = coursesApiSlice.endpoints.getCourses.select();

// Creates memoized selector
export const selectCourses = createSelector(
  selectCoursesResult,
  (coursesResult) => coursesResult.data // Normalized state object with ids and entities.
);

// getSelectors creates these selectors and we rename them with aliases using the object destructuring syntax.

export const {
  selectAll: selectAllCourses,
  selectById: selectCourseById,
  selectIds: selectCourseIds,

  //Pass in a selector that returns the courses slice of state
} = coursesAdapter.getSelectors(state => selectCourses(state) ?? initialState);