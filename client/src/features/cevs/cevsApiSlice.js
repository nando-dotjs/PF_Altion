import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const cevsAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = cevsAdapter.getInitialState()

export const cevsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCevs: builder.query({
            query: () => '/cevs',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedCevs = responseData.map(cev => {
                    cev.id = cev._id
                    return cev
                });
                return cevsAdapter.setAll(initialState, loadedCevs)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Cev', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Cev', id }))
                    ]
                } else return [{ type: 'Cev', id: 'LIST' }]
            }
        }),
        addNewCev: builder.mutation({
            query: initialCev => ({
                url: '/cevs',
                method: 'POST',
                body: {
                    ...initialCev,
                }
            }),
            invalidatesTags: [
                { type: 'Cev', id: "LIST" }
            ]
        }),
        updateCev: builder.mutation({
            query: initialCev => ({
                url: '/cevs',
                method: 'PATCH',
                body: {
                    ...initialCev,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Cev', id: arg.id }
            ]
        }),
        deleteCev: builder.mutation({
            query: ({ id }) => ({
                url: `/cevs`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Cev', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetCevsQuery,
    useAddNewCevMutation,
    useUpdateCevMutation,
    useDeleteCevMutation,
} = cevsApiSlice

export const selectCevsResult = cevsApiSlice.endpoints.getCevs.select()

const selectCevsData = createSelector(
    selectCevsResult,
    cevsResult => cevsResult.data // normalized state object with ids & entities
)

export const {
    selectAll: selectAllCevs,
    selectById: selectCevById,
    selectIds: selectCevIds
} = cevsAdapter.getSelectors(state => selectCevsData(state) ?? initialState)