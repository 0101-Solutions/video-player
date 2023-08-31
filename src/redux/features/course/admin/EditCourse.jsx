import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { selectCourseById } from '../courseApiSlice'

import EditCourseForm from './EditCourseForm'

import Loader from '../../../../components/Loader'

const EditCourse = () => {

  const { id } = useParams()

  const course = useSelector(state => selectCourseById(state, id))

  const content = course ? <EditCourseForm course={course} /> : <Loader />

  return content
}

export default EditCourse