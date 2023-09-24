import { memo } from 'react';

const LandingSection: React.FC = () => {
  return (
    <section id="landing_section" className="landing_section text-white ">
      <div className="container">
        <div className="py-4 pt-5">
          {/* <h3 className=" text-center  pt-5 fs-1 fw-5 ">
            Pizza Hub
          </h3> */}
          <p className="px-sm-5 mt-4 pb-5  landing_quote fs-3 text-light text-center pt-5 ">
            Ordering pizza online has never been this easy. Get ready to slice, click, and enjoy!" 🍕📲
          </p>
          <div className="text-center">
            <a href="#menu_section" className="btn btn-lg mt-2 btn-danger  rounded-pill">Order now</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default memo(LandingSection)