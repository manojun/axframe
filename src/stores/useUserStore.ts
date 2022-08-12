import buildStore from "stores/buildStore";
import { UserService } from "../services";

export interface User {
  uuid: string;
  name: string;
  email: string;
  jobTitle?: string;
}

export interface UserMenuItem {
  icon?: string;
  uuid: string;
  label: string;
  path?: string;
  children?: UserMenuItem[];
}

export interface UserModel {
  me?: User;
  menus: UserMenuItem[];
  openedUuids: string[];
  selectedUuid: string;
}

export interface UserActions {
  setMe: (me: User) => Promise<void>;
  signOut: () => void;
  setMenus: (menus: UserMenuItem[]) => void;
  setOpenedUuids: (uuids: string[]) => void;
  setSelectedUuid: (uuid: string) => void;
}

export interface UserStore extends UserModel, UserActions {}

export const userInitialState: UserModel = {
  menus: [],
  openedUuids: [],
  selectedUuid: "",
};

const useUserStore = buildStore<UserStore>("user", (set, get) => ({
  ...userInitialState,
  setMe: async (me) => {
    const { menus } = await UserService.getUserMenu(me.uuid);
    set({ me, menus });
  },
  signOut: () => {
    set({ me: undefined });
  },
  setMenus: (menus) => {
    set({ menus });
  },
  setOpenedUuids: (uuids) => {
    set({ openedUuids: uuids });
  },
  setSelectedUuid: (uuid) => {
    set({ selectedUuid: uuid });
  },
}));

export default useUserStore;
