import { useParams } from 'react-router-dom'

const VerifyEmail = () => {
  const { token } = useParams();

  console.log(token)

  return (
    <div>VerifyEmail</div>
  )
}

export default VerifyEmail