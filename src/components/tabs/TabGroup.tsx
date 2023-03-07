import styled from "@emotion/styled";
import { TabGroupMenu, TabGroupMenuAction } from "@core/components/contextMenu";
import * as React from "react";
import { ReactSortable } from "react-sortablejs";
import { SMixinFlexRow } from "@core/styles/emotion";
import { usePageTabStore } from "@core/stores/usePageTabStore";
import { useI18n } from "@core/hooks/useI18n";
import { useLink } from "@core/hooks/useLink";
import { useLocation } from "react-router-dom";
import TabItem from "./TabItem";
import TabItemMore from "./TabItemMore";

interface Props {}

function TabGroup(props: Props) {
  const activeTabUuid = usePageTabStore((s) => s.activeTabUuid);
  const getActiveTabPage = usePageTabStore((s) => s.getActiveTabPage);
  const pages = usePageTabStore((s) => s.pages);
  const setPages = usePageTabStore((s) => s.setPages);
  const removeTab = usePageTabStore((s) => s.removeTab);
  const removeTabs = usePageTabStore((s) => s.removeTabs);

  const location = useLocation();
  const { currentLanguage } = useI18n();
  const { linkByTo } = useLink();

  const tabItemList = React.useMemo(() => {
    return [...pages].map(([k, v]) => ({ id: k, page: v }));
  }, [pages]);

  const handleRemoveTab = React.useCallback(
    (tabUuid: string) => {
      removeTab(tabUuid);
      const activePageInfo = getActiveTabPage();
      if (activePageInfo.page.path && activePageInfo.page.path !== location.pathname) {
        linkByTo(activePageInfo.page.path);
      }
    },
    [getActiveTabPage, linkByTo, location.pathname, removeTab]
  );

  const handleRemoveOtherTabs = React.useCallback(
    (tabUuid: string, removeType: "OTHERS" | "TO_RIGHT") => {
      const pagesValues = [...pages];

      if (removeType === "OTHERS") {
        const removeTabUuids = pagesValues.filter(([k, v]) => !v.isHome && k !== tabUuid).map(([k]) => k);
        removeTabs(removeTabUuids);
      } else {
        const tabIndex = pagesValues.findIndex(([k]) => k === tabUuid);
        const removeTabUuids = pagesValues
          .slice(tabIndex + 1)
          .filter(([k, v]) => !v.isHome && k !== tabUuid)
          .map(([k]) => k);

        removeTabs(removeTabUuids);
      }

      const activePageInfo = getActiveTabPage();
      if (activePageInfo.page.path && activePageInfo.page.path !== location.pathname) {
        linkByTo(activePageInfo.page.path);
      }
    },
    [getActiveTabPage, linkByTo, location.pathname, pages, removeTabs]
  );

  const scrollerRef = React.useRef<HTMLDivElement>(null);
  const tabGroupMenu = React.useRef<TabGroupMenu>(new TabGroupMenu());

  const handleWheelScroller = React.useCallback((evt: React.WheelEvent) => {
    if (scrollerRef.current) {
      scrollerRef.current.scroll({
        left: scrollerRef.current.scrollLeft + evt.deltaX + evt.deltaY,
      });
    }
  }, []);

  const handleContextMenu = React.useCallback(
    (evt: React.MouseEvent<HTMLDivElement>, tabUuid: string) => {
      evt.preventDefault();

      tabGroupMenu.current.onClick = ({ action }) => {
        switch (action) {
          case TabGroupMenuAction.CLOSE_TAB:
            handleRemoveTab(tabUuid);
            break;
          case TabGroupMenuAction.CLOSE_OTHER_TABS:
            handleRemoveOtherTabs(tabUuid, "OTHERS");
            break;
          case TabGroupMenuAction.CLOSE_TABS_RIGHT:
            handleRemoveOtherTabs(tabUuid, "TO_RIGHT");
            break;
          case TabGroupMenuAction.REFRESH:
            window.location.reload();
            break;
          default:
            break;
        }
      };

      tabGroupMenu.current.popupByItem(evt);
    },
    [handleRemoveOtherTabs, handleRemoveTab]
  );

  const handleClickTab = React.useCallback(
    (tabUuid: string, path?: string) => {
      if (!path) return;
      linkByTo(path);
    },
    [linkByTo]
  );

  // scroll to activeTab
  React.useEffect(() => {
    const refCurrent = scrollerRef.current;
    if (refCurrent) {
      const scrollMargin = 20;

      const activeTabEl = refCurrent.querySelector("[role='active-tab-item']");
      if (!activeTabEl) return;

      const scrollerScrollLeft = refCurrent.scrollLeft;
      const { left: scrollerLeft, right: scrollerRight } = refCurrent.getBoundingClientRect();
      const { left: activeTabLeft, right: activeTabRight } = activeTabEl.getBoundingClientRect();

      if (scrollerRight < activeTabRight) {
        refCurrent.scrollLeft = scrollerScrollLeft + activeTabRight - scrollerRight + scrollMargin;
      } else if (scrollerLeft > activeTabLeft) {
        refCurrent.scrollLeft = scrollerScrollLeft - Math.abs(scrollerLeft - activeTabLeft) - scrollMargin;
      }
    }
  }, [activeTabUuid]);

  React.useEffect(() => {
    tabGroupMenu.current.language = currentLanguage;
  }, [currentLanguage]);

  return (
    <TabGroupContainer>
      <TabLine />
      <TabItemsGroup>
        <TabItemsScroller ref={scrollerRef} onWheel={handleWheelScroller} role={"tab-scroller"}>
          <ReactSortable
            animation={300}
            delayOnTouchOnly
            delay={30}
            list={tabItemList}
            setList={(newState) => {
              setPages?.(newState.map((tabItem) => [tabItem.id, tabItem.page]));
            }}
            onEnd={(evt) => {
              evt.item.click();
            }}
          >
            {tabItemList.map((tabItem, index) => (
              <TabItem
                key={index}
                tabUuid={tabItem.id}
                tabInfo={tabItem.page}
                onContextMenu={handleContextMenu}
                onClickTab={handleClickTab}
                onRemoveTab={handleRemoveTab}
              />
            ))}
          </ReactSortable>
        </TabItemsScroller>
        <TabItemMore />
      </TabItemsGroup>
    </TabGroupContainer>
  );
}

const TabGroupContainer = styled.div`
  flex: 1;
  position: relative;
  height: 68px;
  overflow: hidden;
`;

const TabLine = styled.div`
  position: absolute;
  height: 4px;
  width: 100%;
  bottom: 0;
  left: 0;
  background: ${(p) => p.theme.axf_tabs_scroll_track_color};
  border-radius: 4px 0 0 4px;
`;

const TabItemsGroup = styled.div`
  ${SMixinFlexRow("stretch", "center")};
  position: absolute;
  bottom: 0;
  padding: 0;
  width: 100%;
  overflow: hidden;

  &:after {
    content: "";
    display: block;
    width: 12px;
    height: calc(100% - 4px);
    position: absolute;
    left: 0;
    top: 0;
    background: linear-gradient(90deg, ${(p) => p.theme.body_background} 0%, rgba(245, 245, 245, 0) 100%);
    z-index: 20;
  }
`;

const TabItemsScroller = styled.div`
  position: relative;
  flex: 1;
  overflow-x: scroll;
  overflow-y: hidden;
  padding: 16px 0 12px 12px;

  &::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(p) => p.theme.axf_tabs_scroll_thumb_color};
    border: 0 none;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: ${(p) => p.theme.axf_tabs_scroll_thumb_hover_color};
  }

  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: ${(p) => p.theme.axf_tabs_scroll_track_color};
  }

  &::-webkit-scrollbar-track:vertical {
    background-color: ${(p) => p.theme.axf_tabs_scroll_track_color};
  }

  &::-webkit-scrollbar-track:horizontal {
    background-color: ${(p) => p.theme.axf_tabs_scroll_track_color};
  }

  &::-webkit-scrollbar-corner {
    background-color: ${(p) => p.theme.axf_tabs_scroll_track_color};
  }

  > div {
    ${SMixinFlexRow("flex-start", "flex-end")};
    display: flex;
    flex: 1;
    column-gap: 0;
    position: relative;
    border-radius: 4px 0 0 4px;
    background: ${(p) => p.theme.axf_tabs_background};
  }
`;

export default TabGroup;
