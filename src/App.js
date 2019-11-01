import React, {
  useState, useEffect
} from 'react';
import Sidebar from './components/Sidebar/index'
import Canvas from './components/Canvas/index'

function App(props) {
  const windowSize = useWindowSize();
  const [params, setParams] = useState({
    width: windowSize.width,
    height: windowSize.height,
    imageURL: 'https://cn.bing.com/th?id=OHR.CharlesNight_ZH-CN0933393880_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp',
    fontSize: 150,
    fontFamily: 'myFont',
    title: 'Charles Bridge',
    textColor: '#f0f0f0',
    content: 'Charles Bridge is the oldest bridge still standing over the Vltava river in Prague and the second oldest bridge in the Czech Republic.',
  });

  return (
    <div> 
      {/* <Sidebar/> */}
      <Canvas params={params}/>
    </div>
  )
}

function useWindowSize(){
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowSize(window.innerWidth, window.innerHeight)
    })
    return () => {
      window.removeEventListener('resize', this);
    }
  })

  return windowSize;
}

export default App;