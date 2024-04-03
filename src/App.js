import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import Weather from './a'; // Assuming 'a' is the correct path to your Weather component

function App() {
  const [showWeather, setShowWeather] = useState(false);
  const [city, setCity] = useState('');
  const [savedCity, setSavedCity] = useState('');
  const [date, setDate] = useState(new Date());
  const [output, setOutput] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  const [isOpen, setIsOpen] = useState(false);



  const handleCommand = async (e) => {
    if (e.key === 'Enter') {
      const command = e.target.value.trim();
      switch (command) {
        case 'projects':
          setOutput(
            <div className="py-2">
              <div>
                <div className='text-white'>
                  1. GPS Tracker using Raspberry Pi, Python and HTML
                </div>
              </div>
              <div className='text-white'>
                2. Sentimental Analysis using NLTK library
              </div>
              <div className='text-white'>
                3. LinkedIn Post Likes Analysis
              </div>
              <div className='text-white'>
                4. Project VibeSetter
              </div>
              <div className='text-white'>
                5. Violence Detection Using Drone
              </div>
            </div>
          );
          break;
        case 'bio':
          setOutput(
            <div className='py-3 px-2'>
              <div className='flex'>
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span className='px-4 py-0.5'>8618601238</span>
              </div>

              <div className='flex py-3'>
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className='px-4 py-0.5'>alokhegde221@gmail.com</span>
              </div>

              <div className='flex py-2'>
                <div className='bg-blue-200  items-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50">
                    <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"></path>
                  </svg>
                </div>
                <span className='px-4 py-0.5'><a href="https://www.linkedin.com/in/alok-hegde-298526204/">linkedin</a></span>
              </div>

            </div>
          );
          break;
        case 'help':
          setOutput(
            <div>
              <div> projects - to get a list of my projects</div>
              <div>bio - to get my contact info</div>
            </div>
          )
          break;
        case 'download resume':
          try {
            await downloadResume();
          } catch (error) {
            console.error('Error downloading resume:', error);
            setOutput('Failed to download resume');
          }
          break;
        default:
          setOutput('Command not recognized');
      }
      setInputValue(''); // Clear the input field after processing command
    } else if (selectedProject !== null && e.key === 'Enter') {
      // Handle project selection
      // Here, you can do something with the selected project, for example, display more details
      // For now, let's just log the selected project number
      console.log('Selected project:', selectedProject);
      setInputValue(''); // Clear the input field after selecting a project
      setSelectedProject(null); // Reset selectedProject state
    }
  };


  const downloadResume = async () => {
    try {
      const response = await axios.get('resume.pdf', { responseType: 'blob' });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'resume.pdf'); // Change the filename as needed
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Error downloading resume:', error);
      throw error;
    }
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // Load saved city from sessionStorage when component mounts
  useEffect(() => {
    const savedCity = sessionStorage.getItem('savedCity');
    if (savedCity) {
      setCity(savedCity);
      setSavedCity(savedCity);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleWeatherButtonClick = () => {
    setShowWeather(!showWeather); // Toggle the state when the button is clicked
  };

  const handleCityChange = (e) => {
    const city = e.target.value;
    setCity(city);
    sessionStorage.setItem('savedCity', city); // Save city to sessionStorage
  };

  return (
    <div className="   " >
      <nav className="fixed  bg-blue-200 w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-between text-blue-500 font-mono mx-auto px-2">
          <a className="">Apps</a>
          <button
            className='text-center block rounded  hover:border-gray-200 text-blue-500 hover:bg-gray-200 px-2'
            onClick={handleWeatherButtonClick}
          >
            Weather
          </button>
          <div className='text-center block rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 p-0.5'>{date.toLocaleString()}</div>
        </div>
      </nav>

      {/* Terminal SVG always displayed */}
      <button className="absolute top-20 px-4" onClick={openModal}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span>terminal</span>
      </button>

      <Modal isOpen={isOpen} onRequestClose={closeModal}
        className=''
        style={{
          content: {
            width: '50%',
            height: '50%',
            margin: 'auto',
            border: 'none',
            overflow: 'hidden '
          }
        }}
      >
        <div className='bg-black'>
          <div className='bg-green-900 flex justify-between w-full '>
            <div></div>
            <div className='text-black py-0.5'>TERMINATOR</div>
            <div className='bg-red-600 w-3 h-3 m-2 rounded-full ' onClick={closeModal}></div>
          </div>
          <div className='w-full h-screen flex flex-col text-green-300 p-2'>
            <div className="flex">
              <div>alokie@pop-os:~$</div>
              <input type="text"
                placeholder='type help to see all the commands'
                className='text-green-200 border-none h-6 px-2 w-4/5 bg-black '
                onKeyDown={handleCommand}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}>
              </input>
            </div>
            <div className="py-2">{output}</div>
          </div>
        </div>
      </Modal>

      {/* Weather component rendered conditionally */}
      {showWeather && (
        <div className="flex items-center justify-center py-8 mr-28">
          <Weather />
        </div>
      )}
    </div>
  );
}

export default App;
