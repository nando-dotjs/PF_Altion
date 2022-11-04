import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const pointsAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

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
            query: initialPoint => ({
                url: '/points',
                method: 'POST',
                body: {
                    ...initialPoint,
                }
            }),
            invalidatesTags: [
                { type: 'Point', id: "LIST" }
            ]
        }),
        updatePoint: builder.mutation({
            query: initialPoint => ({
                url: '/points',
                method: 'PATCH',
                body: {
                    ...initialPoint,
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
    useUpdatePointMutation,
    useDeletePointMutation,
} = pointsApiSlice

export const selectPointsResult = pointsApiSlice.endpoints.getPoints.select()

const selectPointsData = createSelector(
    selectPointsResult,
    pointsResult => pointsResult.data // normalized state object with ids & entities
)

export const {
    selectAll: selectAllPoints,
    selectById: selectPointById,
    selectIds: selectPointIds
} = pointsAdapter.getSelectors(state => selectPointsData(state) ?? initialState)