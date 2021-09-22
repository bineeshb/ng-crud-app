import { environment } from '@env/environment';

export const placeholderItemID = '<ITEM_ID>';

const ENDPOINTS_USER = {
  signup: 'signup',
  login: 'login',
  logout: 'logout'
};

const ENDPOINTS_MASTER_STORE = {
  items: '',
  item: placeholderItemID,
  buyItem: `${placeholderItemID}/buy`
};

const ENDPOINTS_USER_STORE = {
  items: '',
  item: placeholderItemID,
  sellItem: `${placeholderItemID}/sell`
};

type User = typeof ENDPOINTS_USER;
type MasterStore = typeof ENDPOINTS_MASTER_STORE;
type UserStore = typeof ENDPOINTS_USER_STORE;

function joinUrls<Type>(apiRoot: string, endpoints: Type): Type {
  return Object.entries(endpoints).reduce(
    (urls: Type, [ key, value ]: [ string, string ]) => ({
      ...urls,
      [key]: `${apiRoot}/${value}`
    }),
    {} as Type
  );
}

export const API_USER: User = joinUrls<User>(environment.apiBase, ENDPOINTS_USER);
export const API_MASTER_STORE: MasterStore = joinUrls<MasterStore>(`${environment.apiBase}/available-items`, ENDPOINTS_MASTER_STORE);
export const API_USER_STORE: UserStore = joinUrls<UserStore>(`${environment.apiBase}/store-items`, ENDPOINTS_USER_STORE);
