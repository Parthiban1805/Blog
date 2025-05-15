import { FiGithub, FiTwitter, FiInstagram } from 'react-icons/fi'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center">
              <span className="text-primary-600 font-bold text-xl mr-2">
                📝
              </span>
              <span className="font-bold text-xl text-gray-900">
                BlogSpace
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Express your thoughts with style.
            </p>
          </div>
       
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-center md:text-left">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} BlogSpace. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer