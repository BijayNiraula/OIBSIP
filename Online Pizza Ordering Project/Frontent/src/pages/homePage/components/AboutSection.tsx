import  { memo } from 'react';


const AboutSection:React.FC = () => {
  return (
    <section className='text_light about_section px-sm-0 px-3 pt-4 container ' id='about_section'>
        <h3 className="   fs-2 fw-normal">
          <span className="pb-1 border border-4 border-warning pe-5 border-top-0 border-start-0 border-end-0 border-bottom-warning">
           About US
          </span>
        </h3>
        <div className="row py-4 pt-md-3 pt-5 d-flex  flex-lg-row flex-column-reverse">
          <p className="col-lg-6 px-3 fs-5 mt-lg-0 mt-3">
          Welcome to Pizza Hub in Kathmandu! We make amazing pizzas with the best ingredients. Our pizzas are so delicious, you'll love every bite. Whether you're from here or just visiting, you can order online for delivery or come to our cozy place. Try Pizza Hub and experience the best pizza in town!
            </p>
          <div className="col-lg-1">

          </div>
          <div className="col-lg-5">
             <img className='w-100 img-fluid'  src="https://poconogo.com/wp-content/uploads/Pizzaros-Pizzeria-eating-area.jpg" alt="restuarent_photo" height={200} width={150} />
          </div>
        </div>
    </section>
  )
}

export default memo(AboutSection)