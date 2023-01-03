import create from "zustand";
import {
  ExampleItem,
  ExampleListRequest,
  ExampleListResponse,
} from "@core/services/example/ExampleRepositoryInterface";
import { AXFDGDataItem, AXFDGPage, AXFDGSortParam } from "@axframe/datagrid";
import { ExampleService } from "services";
import { errorDialog } from "@core/components/dialogs/errorDialog";
import { setMetaDataByPath } from "@core/stores/usePageTabStore";
import { subscribeWithSelector } from "zustand/middleware";
import shallow from "zustand/shallow";
import { PageStoreActions, StoreActions } from "@core/stores/types";
import { pageStoreActions } from "@core/stores/pageStoreActions";

interface APIRequest extends ExampleListRequest {}
interface APIResponse extends ExampleListResponse {}

interface MetaData {
  listRequestValue: APIRequest;
  listColWidths: number[];
  listSortParams: AXFDGSortParam[];
  flexGrow: number;
}

interface States extends MetaData {
  routePath?: string; // initialized Store;
  listSpinning: boolean;
  listData: AXFDGDataItem<ExampleItem>[];
  listPage: AXFDGPage;
}

interface Actions extends PageStoreActions<States> {
  setListRequestValue: (requestValue: APIRequest) => void;
  setListColWidths: (colWidths: number[]) => void;
  setListSpinning: (spinning: boolean) => void;
  setListSortParams: (sortParams: AXFDGSortParam[]) => void;
  callListApi: (request?: APIRequest) => Promise<void>;
  changeListPage: (currentPage: number, pageSize?: number) => Promise<void>;
  setFlexGrow: (flexGlow: number) => void;
}

// create states
const _listRequestValue = {
  pageNumber: 1,
  pageSize: 100,
};
const createState: States = {
  listRequestValue: { ..._listRequestValue },
  listColWidths: [],
  listSpinning: false,
  listData: [],
  listPage: {
    currentPage: 0,
    totalPages: 0,
  },
  listSortParams: [],
  flexGrow: 1,
};

// create actions
const createActions: StoreActions<States & Actions, Actions> = (set, get) => ({
  setListRequestValue: (requestValues) => {
    set({ listRequestValue: requestValues });
  },
  setListColWidths: (colWidths) => set({ listColWidths: colWidths }),
  setListSpinning: (spinning) => set({ listSpinning: spinning }),
  setListSortParams: (sortParams) => set({ listSortParams: sortParams }),
  callListApi: async (request) => {
    await set({ listSpinning: true });

    try {
      const apiParam = request ?? get().listRequestValue;
      const response = await ExampleService.list(apiParam);

      set({
        listData: response.ds.map((values) => ({
          values,
        })),
        listPage: {
          currentPage: response.rs.pageNumber ?? 1,
          pageSize: response.rs.pageSize ?? 0,
          totalPages: response.rs.pgCount ?? 0,
          totalElements: response.ds.length,
        },
      });
    } catch (e) {
      await errorDialog(e as any);
    } finally {
      await set({ listSpinning: false });
    }
  },
  changeListPage: async (pageNumber, pageSize) => {
    const requestValues = {
      ...get().listRequestValue,
      pageNumber,
      pageSize,
    };
    set({ listRequestValue: requestValues });
    await get().callListApi();
  },
  syncMetadata: (metaData) => {
    if (metaData) {
      console.log(`apply metaData Store : useExampleListStore`);
      set({
        listSortParams: metaData.listSortParams,
        listRequestValue: metaData.listRequestValue,
        listColWidths: metaData.listColWidths,
        flexGrow: metaData.flexGrow,
      });
    } else {
      console.log(`clear metaData Store : useExampleListStore`);
      set({
        listRequestValue: _listRequestValue,
      });
    }
  },
  setFlexGrow: (flexGlow) => {
    set({ flexGrow: flexGlow });
  },
  ...pageStoreActions(set, get, () => unSubscribeExampleListWithListStore()),
});

// ---------------- exports
export interface ExampleListWithListStore extends States, Actions, PageStoreActions<States> {}
export const useExampleListWithListStore = create(
  subscribeWithSelector<ExampleListWithListStore>((set, get) => ({
    ...createState,
    ...createActions(set, get),
  }))
);

// pageModel 에 저장할 대상 모델 셀렉터 정의
export const unSubscribeExampleListWithListStore = useExampleListWithListStore.subscribe(
  (s) => [s.listSortParams, s.listRequestValue, s.listColWidths, s.flexGrow],
  ([listSortParams, listRequestValue, listColWidths, flexGrow]) => {
    const routePath = useExampleListWithListStore.getState().routePath;
    if (!routePath) return;
    console.log(`Save metaData '${routePath}', Store : useExampleListWithListStore`);

    setMetaDataByPath<MetaData>(routePath, {
      listSortParams,
      listRequestValue,
      listColWidths,
      flexGrow,
    });
  },
  { equalityFn: shallow }
);
