import React from 'react'
import { Link } from 'react-router-dom'
import { Github, Linkedin, Mail } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-purple-900 border-t border-royal-violet-500">
      <div className="max-w-7xl mx-auto px-4 py-10 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-bold mb-4 text-white">Resume Builder</h3>
            <p className="text-gray-200 mb-4">
              Create professional resumes in minutes with our easy-to-use builder. 
              Stand out from the crowd and land your dream job.
            </p>
            <p className="text-gray-200">
              Designed & developed by <span className="font-semibold">Dharmik Lakhankiya</span>
            </p>
          </div>
          
          {/* Quick links */}
          <div>
            <h3 className="text-sm font-bold uppercase mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-200 hover:text-royal-violet-300">Home</Link></li>
              <li><Link to="/dashboard" className="text-gray-200 hover:text-royal-violet-300">Dashboard</Link></li>
            </ul>
          </div>
          
          {/* Legal links */}
          <div>
            <h3 className="text-sm font-bold uppercase mb-4 text-white">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-200 hover:text-royal-violet-300">Privacy Policy</Link></li>
              <li><Link to="#" className="text-gray-200 hover:text-royal-violet-300">Terms of Service</Link></li>
              <li><Link to="#" className="text-gray-200 hover:text-royal-violet-300">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Social links and copyright */}
        <div className="mt-10 pt-8 border-t border-royal-violet-500 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-200 text-sm mb-4 md:mb-0">
            © {currentYear} Nirvana Nihilation. All rights reserved.
          </p>
          
          <div className="flex space-x-4">
            <a href="https://github.com/Dharmiklakhankiya" target="_blank" rel="noopener noreferrer" 
               className="text-gray-200 hover:text-royal-violet-300">
              <Github size={18} />
            </a>
            <a href="https://www.linkedin.com/in/dharmik-l-7b9865250/" target="_blank" rel="noopener noreferrer"
               className="text-gray-200 hover:text-royal-violet-300">
              <Linkedin size={18} />
            </a>
            <a href="mailto:dharmiklakhankiya@gmail.com" className="text-gray-200 hover:text-royal-violet-300">
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
