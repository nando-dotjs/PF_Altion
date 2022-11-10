import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const routesAdapter = createEntityAdapter({})

const initialState = routesAdapter.getInitialState()

export const routesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getRoutes: builder.query({
            query: () => '/routes',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedRoutes = responseData.map(route => {
                    route.id = route._id
                    return route
                });
                return routesAdapter.setAll(initialState, loadedRoutes)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Route', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Route', id }))
                    ]
                } else return [{ type: 'Route', id: 'LIST' }]
            }
        }),
        addNewRoute: builder.mutation({
            query: initialRouteData => ({
                url: '/routes',
                method: 'POST',
                body: {
                    ...initialRouteData,
                }
            }),
            invalidatesTags: [
                { type: 'Route', id: "LIST" }
            ]
        }),
        updateRoute: builder.mutation({
            query: initialRouteData => ({
                url: '/routes',
                method: 'PATCH',
                body: {
                    ...initialRouteData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Route', id: arg.id }
            ]
        }),
        deleteRoute: builder.mutation({
            query: ({ id }) => ({
                url: `/routes`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Route', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetRoutesQuery,
    useAddNewRouteMutation,
    useUpdateRouteMutation,
    useDeleteRouteMutation,
} = routesApiSlice

// returns the query result object
export const selectRoutesResult = routesApiSlice.endpoints.getRoutes.select()

// creates memoized selector
const selectRoutesData = createSelector(
    selectRoutesResult,
    routesResult => routesResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllRoutes,
    selectById: selectRouteById,
    selectIds: selectRouteIds
    // Pass in a selector that returns the routes slice of state
} = routesAdapter.getSelectors(state => selectRoutesData(state) ?? initialState)