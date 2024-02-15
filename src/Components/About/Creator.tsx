import './Creator.css'
import me from '../../assets/me.jpg'

const Creator = () => {
  return (
    <div className='about__creator'>
        <div className='about__creator--left-view'>
            <h1>Creator</h1>
        </div>
        <div className='about__creator--right-view'>
            <h1>Nam Hai Nguyen 👋</h1>
            <div className='info-container'>
                <p>
                    <span className='info__section'>Name:</span> Nam Hai Nguyen 
                    <br />
                    <span className='info__section'>Nickname:</span> Euclid 
                    <br />
                    <span className='info__section'>Major:</span> Computer Science 
                    <br />
                    <span className='info__section'>Minor:</span> Actuarial Science 
                    <br />
                    <span className='info__section'>At:</span> Michigan State University 
                    <br />
                    <span className='info__section'>Portfolio:</span> <a href='http://bit.ly/portfolio-euclid' target="_blank" rel="noopener noreferrer">http://bit.ly/portfolio-euclid</a>
                    <br />
                    <span className='info__section'>Inspiration behind CourseFlow:</span> I have a habit of sketching our every courses I need to take to fulfill all the university
                    requirements for my degree. Up until now, I have been doing it on paper; it is fine, but there are some relevant issues. Firstly,
                    if I have multiple flows, I would need some physical place to store all the papers, and usually if the amount gets high it will 
                    be quite a mess, which is difficult to retrieve what I currently want. Secondly, if I want to edit and refind my flows, I need to
                    erase it, or even cross out everything I have done, which leads to me creating a brand new one. I know there are many students 
                    out there have their Ipad and could do this on a note app, but isn't it nice to have an distinctive application just for this 
                    purpose? That's when I came up with CourseFlow, a easy solution to address this. With CourseFlow, it is quick and easy enough 
                    to add or delete a new course to your current flow, save it, and come back later if you need further edit! For MSU CS major only,
                    things get even more convienient when CourseFlow can auto generate a flow for them!
                </p>
                <img src={me} alt='picture of owner' className='creator-img'/>                
            </div>
        </div>
    </div>
  )
}

export default Creator