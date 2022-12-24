import { getCurrentUser } from '../main/IPC/getCurrentUser'
import { request } from '../utils/request'

export interface ShowAvatarInfoList {
  avatarId: number
  level: number
}

export interface ProfilePicture {
  avatarId: number
}

export interface PropMap {
  type: number
  ival: string
  val?: string
}

export interface Reliquary {
  level: number
  mainPropId: number
  appendPropIdList: number[]
}

export interface ReliquaryMainstat {
  mainPropId: string
  statValue: number
}

export interface ReliquarySubstats {
  appendPropId: string
  statValue: number
}

export interface WeaponStats {
  appendPropId: string
  statValue: number
}

export interface Flat {
  nameTextMapHash: string
  setNameTextMapHash?: string
  rankLevel: number
  reliquaryMainstat?: ReliquaryMainstat
  reliquarySubstats?: ReliquarySubstats[]
  itemType: string
  icon: string
  equipType?: string
  weaponStats?: WeaponStats[]
}

export interface Weapon {
  level: number
  promoteLevel?: number
  affixMap: Record<number, number>
}

export interface EquipList {
  itemId: number
  reliquary?: Reliquary
  flat: Flat
  weapon?: Weapon
}

export interface FetterInfo {
  expLevel: number
}

export interface AvatarInfoList {
  avatarId: number
  propMap: PropMap
  fightPropMap: Record<number, number>
  skillDepotId: number
  inherentProudSkillList: number[]
  skillLevelMap: Record<number, number>
  equipList: EquipList[]
  fetterInfo: FetterInfo
  talentIdList?: number[]
  proudSkillExtraLevelMap?: Record<number, number>
}

export interface PlayerInfo {
  nickname: string
  level: number
  signature: string
  worldLevel: number
  nameCardId: number
  finishAchievementNum: number
  towerFloorIndex: number
  towerLevelIndex: number
  showAvatarInfoList: ShowAvatarInfoList[]
  showNameCardIdList: number[]
  profilePicture: ProfilePicture
}

export interface EnkaUserData {
  playerInfo: PlayerInfo
  avatarInfoList: AvatarInfoList[]
  ttl: number
  uid: string
}

const api = (uid: string) => `https://enka.network/u/${uid}/__data.json`

/** 获取游戏内展示柜的角色详情，来自 enka.network */
export async function getCabinetRoleList(uid?: string) {
  const currentUser = getCurrentUser()

  if (!currentUser) {
    return null
  }

  const targetUid = uid ?? currentUser.uid

  const { status, data } = await request.get<EnkaUserData>(api(targetUid))

  if (status !== 200) {
    console.log('getCabinetRoleList: ', data)
  }

  return data
}
