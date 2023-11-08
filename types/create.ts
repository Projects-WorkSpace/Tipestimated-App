export interface IChannelsAndGroups {
  allChannels: AllChannelsOrAllGroups;
  allGroups: AllChannelsOrAllGroups;
}
export interface AllChannelsOrAllGroups {
  edges?: EdgesEntity[] | null;
}
export interface EdgesEntity {
  node: NodeData;
}
export interface NodeData {
  id: string;
  name: string;
  isPrivate: boolean;
  followerCount: number;
  iconUrl: string;
  checked?: boolean;
}
