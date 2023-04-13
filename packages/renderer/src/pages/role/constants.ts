import type { TabType } from '.'

import Anemo from '@/assets/anemo.png'
import Cryo from '@/assets/cryo.png'
import Dendro from '@/assets/dendro.png'
import Electro from '@/assets/electro.png'
import Geo from '@/assets/geo.png'
import Hydro from '@/assets/hydro.png'
import Pyro from '@/assets/pyro.png'
import star1 from '@/assets/star1.png'
import star2 from '@/assets/star2.png'
import star3 from '@/assets/star3.png'
import star4 from '@/assets/star4.png'
import star5 from '@/assets/star5.png'

export const ElementOptions = [
  {
    value: 'all',
    label: '所有元素'
  },
  {
    value: 'Pyro',
    label: '火元素'
  },
  {
    value: 'Electro',
    label: '雷元素'
  },
  {
    value: 'Geo',
    label: '岩元素'
  },
  {
    value: 'Cryo',
    label: '冰元素'
  },
  {
    value: 'Anemo',
    label: '风元素'
  },
  {
    value: 'Hydro',
    label: '水元素'
  },
  {
    value: 'Dendro',
    label: '草元素'
  }
]

export const WeaponOptions = [
  {
    value: 0,
    label: '所有武器'
  },
  {
    value: 1,
    label: '单手剑'
  },
  {
    value: 11,
    label: '双手剑'
  },
  {
    value: 12,
    label: '弓'
  },
  {
    value: 13,
    label: '长柄武器'
  },
  {
    value: 10,
    label: '法器'
  }
]

export const RarityOptions = [
  {
    value: 0,
    label: '所有星级'
  },
  {
    value: 5,
    label: '5星角色'
  },
  {
    value: 4,
    label: '4星角色'
  }
]

export const tabs: TabType[] = ['weapon', 'reliquary', 'constellation', 'profile']

export const TabMap: Record<TabType, string> = {
  weapon: '武器',
  reliquary: '圣遗物',
  constellation: '命座',
  profile: '简介'
}

export const StarImgs: string[] = [star1, star2, star3, star4, star5]

export const ElementImgs: Record<string, string> = {
  Pyro,
  Hydro,
  Anemo,
  Electro,
  Geo,
  Cryo,
  Dendro
}
