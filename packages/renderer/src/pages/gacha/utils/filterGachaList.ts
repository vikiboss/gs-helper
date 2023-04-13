import type { FilterType } from '..'
import type { GachaData, GachaItemType, GachaType } from '@/types'

export const GachaTypeMap: Record<GachaType, string> = {
  weapon: '302',
  activity: '301',
  normal: '200',
  newer: '100'
}

export const ItemTypeMap: Record<GachaItemType, string> = {
  weapon: '武器',
  role: '角色'
}

function transformGachaType(type: FilterType['gacha']): string[] {
  return type.map((e) => GachaTypeMap[e])
}

function transformItemType(type: FilterType['item']): string[] {
  return type.map((e) => ItemTypeMap[e])
}

function transformStarType(type: FilterType['star']): string[] {
  return type.map((e) => String(e))
}

export default function filterGachaList(list: GachaData['list'], type: FilterType) {
  const { item: itemType, gacha: gachaType, star: starType } = type

  let result = [...list]

  result = result.filter((e) => transformItemType(itemType).includes(e.item_type))
  result = result.filter((e) => transformGachaType(gachaType).includes(e.uigf_gacha_type))
  result = result.filter((e) => transformStarType(starType).includes(e.rank_type))

  return result
}
