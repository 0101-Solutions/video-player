import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { selectOrderById } from './ordersApiSlice'

import EditOrderForm from './EditOrderForm'
import Loader from '../../../components/Loader'

const EditOrder = () => {
  const { id } = useParams()

  const order = useSelector(state => selectOrderById(state, id))

  const content = order ? <EditOrderForm order={order} /> : <Loader />

  return content
}

export default EditOrder