import { INode } from './node'
import { IMember } from './member'

export interface IThreadProps{
  title: string,
  member: IMember,
  node: INode,
  last_modified: number,
  tid: number,
  replies: number,
  not_navi?:boolean
}
export { INode, IMember };
