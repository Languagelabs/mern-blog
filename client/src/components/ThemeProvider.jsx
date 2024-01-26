import { useSelector } from "react-redux" 
import PropTypes from 'prop-types'

export default function ThemeProvider({children}) {

  const { theme } = useSelector((state) => state.theme)
  return (
    <div className={theme}> 
        <div className="bg-white text-dark dark:bg-black dark:text-white min-h-screen"> 
             {children}
        </div>
    </div>
  )
}

ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired
}
