import { useGetCompanysQuery } from "./companysApiSlice"
import Company from "./Company"
import useAuth from "../../hooks/useAuth"

const CompanysList = () => {

    const { username, isAdmin } = useAuth()
    const {
        data: companys,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetCompanysQuery('companysList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <p>Cargando...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids, entities } = companys

        let filteredIds
        if (isAdmin) {
            filteredIds = [...ids]
        } else {
            filteredIds = ids.filter(companyId => entities[companyId].username === username)
        }

        const tableContent = ids?.length && filteredIds.map(companyId => <Company key={companyId} companyId={companyId} />)
       
        content = (
            <table className="table tableCompanys">
                <thead className="tableThead">
                    <tr>
                        <th scope="col" className="tableTh companyStatus">Estado</th>
                        <th scope="col" className="tableTh companyCreated">Creado</th>
                        <th scope="col" className="tableTh companyUpdated">Actualizado</th>
                        <th scope="col" className="tableTh companyTitle">Nombre</th>
                        <th scope="col" className="tableTh companyUsername">Propietario:</th>
                        <th scope="col" className="tableTh companyEdit">Editar</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        )
    }

    return content
}
export default CompanysList