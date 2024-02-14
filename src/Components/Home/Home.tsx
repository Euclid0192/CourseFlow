import { useNavigate } from 'react-router-dom'
import './Home.css'
import { TypeAnimation } from 'react-type-animation'

const Home = () => {

  const navigate = useNavigate()

  const buttonClick = (path: string) => {
      navigate(path)
  }

  return (
    <div className="home__container">
      <div className='home__view--left type-animation'>
        <TypeAnimation
          sequence={[
              "Wanna sketch out 4 years of university?",
              500,
              "Need a tool?",
              500,
              "Try CourseFlow now!",
              700,
              "Visually build your courses workflow with ease.",
              1000,
          ]}
          wrapper="span"
          speed={60}
          style={{fontSize: '2em'}}
          repeat={Infinity}
        />        
      </div>

      <div className='home__view--right'>
        <button className='btn home__btn' onClick={() => buttonClick('/main')}>Try it now!</button>
        <button className='btn home__btn' onClick={() => buttonClick('/about')}>Tutorial</button>
      </div>
    </div>
  )
}

export default Home