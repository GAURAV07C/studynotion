import React from 'react'
import HighlightText from '../AboutPage/HighlightText';
import CTAButton from "../../../components/common/Button"
import Know_your_progress from "../../../assets/Images/Know_your_progress.png";
import Compare_with_others from "../../../assets/Images/Compare_with_others.svg";
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.svg";

const LearningLanguageSection = () => {
  return (
    <div className='mt-[130px]'>
      <div className='flex flex-col gap-5 items-center'>
        <div className='text-4xl font-semibold text-center'>
        Your swiss knife for
      <HighlightText text={"learning any language"} />

        </div>
        <div className='text-center text-richblack-600 mx-auto text-base font-medium w[70%] '>
        Using spin making learning multiple languages easy. with 20+
              languages realistic voice-over, progress tracking, custom schedule
              and more.
        </div>

        <div className='flex flex-col lg:flex-row items-center justify-center mt-8 lg:mt-0'>
            <img src={Know_your_progress} alt="knowYourProgress" className='object-contain  lg:-mr-32' />
            <img src={Compare_with_others} alt="knowYourProgress" className='object-contain lg:-mb-10 lg:-mt-0 -mt-12' />
            <img src={Plan_your_lessons} alt="knowYourProgress" className='object-contain  lg:-ml-36 lg:-mt-5 -mt-16' />

        </div>
      </div>
      <div className="w-fit mx-auto -mt-5 lg:mb-20 mb-8 ">
            <CTAButton active={true} linkto={"/signup"}>
              <div className="">Learn More</div>
            </CTAButton>
          </div>

    </div>
  )
}

export default LearningLanguageSection
