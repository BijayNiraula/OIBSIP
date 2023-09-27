import { memo } from 'react';
import IndicatorsSection from './components/IndicatorsSection';
import ChangeAdminGmail from './components/ChangeAdminGmail';

const DashboardSection: React.FC = () => {

  return (
    <section className='bg-light dashboard_section py-2 w-100'>
     
      <IndicatorsSection />
      <ChangeAdminGmail/>
    </section>
  )
}

export default memo(DashboardSection)