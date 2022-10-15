import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const companysAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = companysAdapter.getInitialState()

export const companysApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCompanys: builder.query({
            query: () => '/companys',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedCompanys = responseData.map(company => {
                    company.id = company._id
                    return company
                });
                return companysAdapter.setAll(initialState, loadedCompanys)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Company', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Company', id }))
                    ]
                } else return [{ type: 'Company', id: 'LIST' }]
            }
        }),
        addNewCompany: builder.mutation({
            query: initialCompany => ({
                url: '/companys',
                method: 'POST',
                body: {
                    ...initialCompany,
                }
            }),
            invalidatesTags: [
                { type: 'Company', id: "LIST" }
            ]
        }),
        updateCompany: builder.mutation({
            query: initialCompany => ({
                url: '/companys',
                method: 'PATCH',
                body: {
                    ...initialCompany,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Company', id: arg.id }
            ]
        }),
        deleteCompany: builder.mutation({
            query: ({ id }) => ({
                url: `/companys`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Company', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetCompanysQuery,
    useAddNewCompanyMutation,
    useUpdateCompanyMutation,
    useDeleteCompanyMutation,
} = companysApiSlice

export const selectCompanysResult = companysApiSlice.endpoints.getCompanys.select()

const selectCompanysData = createSelector(
    selectCompanysResult,
    companysResult => companysResult.data // normalized state object with ids & entities
)

export const {
    selectAll: selectAllCompanys,
    selectById: selectCompanyById,
    selectIds: selectCompanyIds
} = companysAdapter.getSelectors(state => selectCompanysData(state) ?? initialState)