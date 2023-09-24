import { memo } from "react"

interface IndicatorPropsInterface {
    heading: string,
    totalNumber: number,
    className: string
}

const Indicators: React.FC<IndicatorPropsInterface> = ({ heading, totalNumber, className }) => {
    return (
        <div className={`col-sm-3 col-5 c px-sm-3 border bg-white shadow p-2 border border-end-0 border-top-0 border-bottom-0 ${className} border-5`}>
            <strong className='fs-5'>
                {heading}
            </strong>
            <p className=' fs-3 '>
                {totalNumber}
            </p>
        </div>
    )
}

export default memo(Indicators)