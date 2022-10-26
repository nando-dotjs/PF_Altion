import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const zonesAdapter = createEntityAdapter({})

const initialState = zonesAdapter.getInitialState()

export const zonesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getZones: builder.query({
            query: () => '/zones',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedZones = responseData.map(zone => {
                    zone.id = zone._id
                    return zone
                });
                return zonesAdapter.setAll(initialState, loadedZones)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Zone', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Zone', id }))
                    ]
                } else return [{ type: 'Zone', id: 'LIST' }]
            }
        }),
        addNewZone: builder.mutation({
            query: initialZoneData => ({
                url: '/zones',
                method: 'POST',
                body: {
                    ...initialZoneData,
                }
            }),
            invalidatesTags: [
                { type: 'Zone', id: "LIST" }
            ]
        }),
        createNewZone: builder.mutation({
            query: initialZoneData => ({
                url: '/register',
                method: 'POST',
                body: {
                    ...initialZoneData,
                }
            }),
            invalidatesTags: [
                { type: 'Zone', id: "LIST" }
            ]
        }),
        updateZone: builder.mutation({
            query: initialZoneData => ({
                url: '/zones',
                method: 'PATCH',
                body: {
                    ...initialZoneData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Zone', id: arg.id }
            ]
        }),
        deleteZone: builder.mutation({
            query: ({ id }) => ({
                url: `/zones`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Zone', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetZonesQuery,
    useAddNewZoneMutation,
    useCreateNewZoneMutation,
    useUpdateZoneMutation,
    useDeleteZoneMutation,
} = zonesApiSlice

// returns the query result object
export const selectZonesResult = zonesApiSlice.endpoints.getZones.select()

// creates memoized selector
const selectZonesData = createSelector(
    selectZonesResult,
    zonesResult => zonesResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllZones,
    selectById: selectZoneById,
    selectIds: selectZoneIds
    // Pass in a selector that returns the zones slice of state
} = zonesAdapter.getSelectors(state => selectZonesData(state) ?? initialState)