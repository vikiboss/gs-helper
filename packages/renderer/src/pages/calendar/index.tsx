import React, { useState } from 'react'
import { TiArrowBack } from 'react-icons/ti'
import { useNavigate } from 'react-router-dom'

import DailyMaterial from './DailyMaterial'
import styles from './index.less'
import WeekMaterial from './WeekMaterial'
import CircleButton from '../../components/CircleButton'
import Loading from '../../components/Loading'
import SelectButton from '../../components/SelectButton'
import useApi from '../../hooks/useApi'
import useMount from '../../hooks/useMount'
import useNotice from '../../hooks/useNotice'
import nativeApi from '../../utils/nativeApi'

import type { RepoRole } from './WeekMaterial'
import type { CalendarData } from '../../../services/getCalendarList'
import type { BaseRes } from '../../../typings'

export default function Calendar() {
  const navigate = useNavigate()
  const notice = useNotice()
  const [tab, setTab] = useState<'daily' | 'week'>('daily')

  const { r: fetchCal, d: cals, l: l1 } = useApi<BaseRes<CalendarData>>(nativeApi.getCalendarEvents)
  const { r: fetchRepo, d: roles, l: l2 } = useApi<RepoRole[], [string]>(nativeApi.getRepoData)

  const loaded = !l1 && !l2

  useMount(async () => {
    await fetchCal()
    await fetchRepo('roles.json')
  })

  const items = [
    { label: '日常材料', value: 'daily' },
    { label: '周本材料', value: 'week' }
  ]

  const { list } = cals?.data ?? {}

  const main = (
    <>
      <div className={styles.top}>
        <SelectButton value={tab} changeItem={setTab} items={items} />
      </div>
      {tab === 'daily' && <DailyMaterial cals={list} notice={notice} />}
      {tab === 'week' && <WeekMaterial roles={roles || []} notice={notice} />}
    </>
  )

  return (
    <>
      <div className={styles.container}>
        {loaded && list && roles ? main : <Loading />}

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
