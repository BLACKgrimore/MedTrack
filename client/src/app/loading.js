import { Ellipsis } from 'react-css-spinners'

const Loader = props => (
  <div className='h-screen w-screen bg-veryLightPink flex items-center justify-center'>
    {/* Use defaults (color #fff, size 64px) */}
    <Ellipsis />

    {/* Pass props like color and size (more in demo) */}
    <Ellipsis color="#ffdf00" size={40} />

    {/* Pass a CSS class to get full control over styling */}
    <Ellipsis className="my-ellipsis" />
  </div>
)

export default Loader