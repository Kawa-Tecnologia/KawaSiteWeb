import React from 'react'
import { BackendStatus, mapBackendToFrontendStatus } from '../utils/statusType';
import { formatDate } from '../utils/formatDate';


interface ServiceItem {
    id: number
    request_dev_id: number
    user_id: number
    receive_user_id: number
    accomplished: boolean
    term: number
    date: string
    active: boolean
    value: number
    avaliation: number
    request_comment: string
    status: BackendStatus
  }
interface ServiceItemItemProps {
    servicePerformed: ServiceItem,
}

const ServiceItem: React.FC<ServiceItemItemProps> = ({ servicePerformed }) => {

  return (
    <tr>
      <td>{servicePerformed.date ? formatDate(servicePerformed.date) : ''}</td>
      <td>{servicePerformed.request_dev_id}</td>
      <td>{servicePerformed.avaliation}</td>
      <td className="hide-on-mobile">{servicePerformed.accomplished ? 'Sim' : 'Não'}</td>
      <td>R${servicePerformed.value || 0}</td>
      <td className="hide-on-mobile">{mapBackendToFrontendStatus(servicePerformed.status)}</td>
    </tr>
  )
}

export default ServiceItem
