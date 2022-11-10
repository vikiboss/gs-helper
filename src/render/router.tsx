import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'

import Calendar from './pages/calendar'
import Portal from './pages/portal'
import Gacha from './pages/gacha'
import Statistic from './pages/statistic'
import Home from './pages/home'
import Login from './pages/login'
import Note from './pages/note'
import Role from './pages/role'
import Setting from './pages/setting'
import Sign from './pages/sign'
import Strategy from './pages/strategy'

const AppRouter: React.FC = () => (
  <HashRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/calendar' element={<Calendar />} />
      <Route path='/portal' element={<Portal />} />
      <Route path='/gacha' element={<Gacha />} />
      <Route path='/statistic' element={<Statistic />} />
      <Route path='/login' element={<Login />} />
      <Route path='/note' element={<Note />} />
      <Route path='/role' element={<Role />} />
      <Route path='/setting' element={<Setting />} />
      <Route path='/sign' element={<Sign />} />
      <Route path='/strategy' element={<Strategy />} />
    </Routes>
  </HashRouter>
)

export default AppRouter
