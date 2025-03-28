import { Html } from '@react-three/drei'

const Loader = ({size}) => {
  return (
    <Html>
        <div className='flex justify-center items-center'>
            <div className={`w-${size} h-${size} border-2 border-opacity-20 border-blue-500 border-t-blue-500 rounded-full animate-spin`} />
        </div>
    </Html>
  )
}

export default Loader