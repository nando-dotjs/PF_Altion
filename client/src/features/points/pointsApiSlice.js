import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const pointsAdapter = createEntityAdapter({})

const initialState = pointsAdapter.getInitialState()

export const pointsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPoints: builder.query({
            query: () => '/points',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedPoints = responseData.map(point => {
                    point.id = point._id
                    return point
                });
                return pointsAdapter.setAll(initialState, loadedPoints)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Point', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Point', id }))
                    ]
                } else return [{ type: 'Point', id: 'LIST' }]
            }
        }),
        addNewPoint: builder.mutation({
            query: initialPointData => ({
                url: '/points',
                method: 'POST',
                body: {
                    ...initialPointData,
                }
            }),
            invalidatesTags: [
                { type: 'Point', id: "LIST" }
            ]
        }),
        createNewPoint: builder.mutation({
            query: initialPointData => ({
                url: '/register',
                method: 'POST',
                body: {
                    ...initialPointData,
                }
            }),
            invalidatesTags: [
                { type: 'Point', id: "LIST" }
            ]
        }),
        updatePoint: builder.mutation({
            query: initialPointData => ({
                url: '/points',
                method: 'PATCH',
                body: {
                    ...initialPointData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Point', id: arg.id }
            ]
        }),
        deletePoint: builder.mutation({
            query: ({ id }) => ({
                url: `/points`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Point', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetPointsQuery,
    useAddNewPointMutation,
    useCreateNewPointMutation,
    useUpdatePointMutation,
    useDeletePointMutation,
} = pointsApiSlice

// returns the query result object
export const selectPointsResult = pointsApiSlice.endpoints.getPoints.select()

// creates memoized selector
const selectPointsData = createSelector(
    selectPointsResult,
    pointsResult => pointsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllPoints,
    selectById: selectPointById,
    selectIds: selectPointIds
    // Pass in a selector that returns the points slice of state
} = pointsAdapter.getSelectors(state => selectPointsData(state) ?? initialState)