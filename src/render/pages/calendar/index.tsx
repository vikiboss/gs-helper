import React, { useEffect, useState } from 'react'
import { TiArrowBack } from 'react-icons/ti'
import { useNavigate } from 'react-router-dom'

import CircleButton from '../../components/CircleButton'
import DailyMaterial from './DailyMaterial'
import Loading from '../../components/Loading'
import nativeApi from '../../utils/nativeApi'
import SelectButton from '../../components/SelectButton'
import useApi from '../../hooks/useApi'
import useNotice from '../../hooks/useNotice'
import WeekMaterial from './WeekMaterial'

import type { CalenderData } from '../../../services/getCalenderList'
import type { RepoRole } from './WeekMaterial'
import type { BaseRes } from '../../../typings'

import styles from './index.less'

const Calender: React.FC = () => {
  const navigate = useNavigate()
  const notice = useNotice()
  const [tab, setTab] = useState<'daily' | 'week'>('daily')
  const { r: fetchCal, d: cals, l: l1 } = useApi<BaseRes<CalenderData>>(nativeApi.getCalenderEvents)
  const { r: fetchRepo, d: roles = [], l: l2 } = useApi<RepoRole[], [string]>(nativeApi.getRepoData)

  const loaded = !(l1 || l2)

  const fetchData = async () => {
    await fetchCal()
    await fetchRepo('roles.json')
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className={styles.container}>
        {loaded && cals?.data?.list?.length ? (
          <>
            <div className={styles.top}>
              <SelectButton
                value={tab}
                changeItem={setTab}
                items={[
                  { label: '日常材料', value: 'daily' },
                  { label: '周本材料', value: 'week' }
                ]}
              />
            </div>
            {tab === 'daily' && <DailyMaterial cals={cals?.data?.list || []} notice={notice} />}
            {tab === 'week' && <WeekMaterial roles={roles || []} notice={notice} />}
          </>
        ) : (
          <Loading />
        )}

        <CircleButton
          Icon={TiArrowBack}
          size='middle'
          className={styles.backBtn}
          onClick={() => navigate('/')}
        />
      </div>
      {notice.holder}
    </>
  )
}

export default Calender
