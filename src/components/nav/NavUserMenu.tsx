import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Menu } from "antd";
import { MenuProps } from "antd/lib/menu";
import { useI18n, useLink } from "@core/hooks";
import * as React from "react";
import { SMixinScrollerStyle } from "@core/styles/emotion";
import { MenuItem, useAppMenu } from "router";
import { useAppStore, useUserStore } from "stores";
import { AppMenu, AppMenuGroup } from "services";
import { MenuIcon } from "components/MenuIcon";

interface StyleProps {
  sideMenuOpened?: boolean;
}

interface Props extends StyleProps {
  menus?: MenuItem[];
  openedMenuUuids?: string[];
  selectedMenuUuid?: string;
}

function NavUserMenu({}: Props) {
  const { currentLanguage } = useI18n();
  const { linkByMenu } = useLink();
  const { APP_MENUS } = useAppMenu();

  const sideMenuOpened = useAppStore((s) => s.sideMenuOpened);
  const openedMenuUuids = useUserStore((s) => s.openedMenuUuids);
  const setOpenedMenuUuids = useUserStore((s) => s.setOpenedMenuUuids);
  const selectedMenuUuid = useUserStore((s) => s.selectedMenuUuid);

  const menus = React.useMemo(() => {
    const getAppMenus = (menus: AppMenu[], pid: string): MenuItem[] => {
      return menus
        .map((m, idx) => {
          const children = getAppMenus(m.children, pid + "_" + idx);
          if (m.children.length > 0 && children.length === 0) {
            return;
          }
          return {
            icon: m.iconTy ? <MenuIcon typeName={m.iconTy} /> : null,
            key: pid + "_" + idx,
            program_type: m.progCd,
            labels: m.multiLanguage,
            label: m.multiLanguage[currentLanguage],
            title: m.multiLanguage[currentLanguage],
            children: children.length === 0 ? undefined : children,
          } as MenuItem;
        })
        .filter(Boolean) as MenuItem[];
    };

    const getAppMenuGroups = (menuGroups: AppMenuGroup[]) => {
      return menuGroups.map((mg, idx) => {
        const children = getAppMenus(mg.children, `${idx}`);
        return {
          icon: mg.iconTy ? <MenuIcon typeName={mg.iconTy} /> : null,
          key: mg.menuGrpCd,
          labels: mg.multiLanguage,
          label: mg.multiLanguage[currentLanguage],
          children: children.length === 0 ? undefined : children,
        } as MenuItem;
      });
    };
    return getAppMenuGroups(APP_MENUS);
  }, [APP_MENUS, currentLanguage]);

  const onSideMenuOpenChange = React.useCallback(
    (openKeys: string[]) => {
      setOpenedMenuUuids(openKeys);
    },
    [setOpenedMenuUuids]
  );

  const onClick: MenuProps["onClick"] = React.useCallback(
    ({ key }) => {
      const keyPath = key.split(/_/g);
      const menu = keyPath.reduce((acc, cur) => {
        return acc[cur].children ? acc[cur].children : acc[cur];
      }, menus);

      linkByMenu(menu);
    },
    [linkByMenu, menus]
  );

  if (menus.length === 0) {
    return null;
  }

  return (
    <NavUserMenuContainer sideMenuOpened={sideMenuOpened}>
      <Menu
        mode={"inline"}
        items={menus}
        defaultOpenKeys={sideMenuOpened ? openedMenuUuids : []}
        onOpenChange={onSideMenuOpenChange}
        selectedKeys={[selectedMenuUuid]}
        inlineIndent={14}
        inlineCollapsed={!sideMenuOpened}
        onClick={onClick}
        _internalDisableMenuItemTitleTooltip
      />
    </NavUserMenuContainer>
  );
}

const NavUserMenuContainer = styled.div<StyleProps>`
  flex: 1;
  overflow: auto;
  overflow-x: hidden;
  user-select: none;

  ${({ sideMenuOpened, theme }) => {
    if (sideMenuOpened) {
      return css`
        padding: 2px 0;
        ${SMixinScrollerStyle({
          track_color: theme.body_background,
          thumb_color: theme.scroll_thumb_color,
        })};
      `;
    }
    return css`
      padding: 0;
      ${SMixinScrollerStyle({
        track_color: theme.component_background,
        thumb_color: theme.scroll_thumb_color,
      })};
    `;
  }}
  .ant-menu {
    background: inherit;
    color: ${(p) => p.theme.text_heading_color};
    font-weight: 500;
  }

  // 우측에 보더값 제거
  .ant-menu-inline,
  .ant-menu-vertical,
  .ant-menu-vertical-left {
    border-right: 0 none;
    border-inline-end: 0 none !important;
  }

  // 그룹메뉴 색상 및 스타일 조정
  .ant-menu-sub {
    &.ant-menu-inline {
      background: inherit;
      font-size: 13px;
      font-weight: 400;
      color: ${(p) => p.theme.text_body_color};
    }

    .ant-menu-item-icon {
      font-size: 20px;
    }

    .ant-menu-item-selected {
      .ant-menu-item-icon {
        color: ${(p) => p.theme.primary_color};
      }
    }
  }

  // 0depth
  .ant-menu-root > .ant-menu-submenu > .ant-menu-submenu-title {
    //background: #000;
    //margin-bottom: 1px !important;
    //margin-top: 1px !important;

    height: 36px;
    line-height: 36px;
    font-size: 14px;
    font-weight: 700;

    .ant-menu-item-icon {
      font-size: 22px;
      color: ${(p) => p.theme.primary_color};
    }
  }
  // 1depth
  .ant-menu-inline .ant-menu-sub.ant-menu-inline > .ant-menu-submenu > .ant-menu-submenu-title {
    //background: red;
    //margin-bottom: 1px !important;
    //margin-top: 1px !important;

    height: 34px;
    line-height: 34px;
    //font-size: 13px;
    .ant-menu-item-icon {
      font-size: 20px;
      color: ${(p) => p.theme.primary_color};
    }
  }
  // 2depth
  .ant-menu-inline .ant-menu-item {
    //background: green;
    //margin-bottom: 2px !important;
    //margin-top: 2px !important;
    margin-block: 1px;

    height: 32px;
    line-height: 32px;
    //font-size: 13px;
    .ant-menu-item-icon {
      font-size: 16px;
      color: ${(p) => p.theme.primary_color};
    }
  }

  // !opened menu
  .ant-menu.ant-menu-inline-collapsed {
    width: 60px;
  }

  // !opened menu padding 조절, 아이콘 크기 조절
  .ant-menu.ant-menu-inline-collapsed > .ant-menu-item,
  .ant-menu.ant-menu-inline-collapsed > .ant-menu-item-group > .ant-menu-item-group-list > .ant-menu-item,
  .ant-menu.ant-menu-inline-collapsed
    > .ant-menu-item-group
    > .ant-menu-item-group-list
    > .ant-menu-submenu
    > .ant-menu-submenu-title,
  .ant-menu.ant-menu-inline-collapsed > .ant-menu-submenu > .ant-menu-submenu-title {
    padding: 0 calc(50% - 22px / 2);

    .ant-menu-item-icon {
      font-size: 24px;
      margin-top: 7px;
    }
  }

  .ant-menu-sub .ant-menu-sub > .ant-menu-item {
    height: 35px;
    line-height: 35px;
    font-size: 12px;
  }

  .ant-menu-inline-collapsed > .ant-menu-submenu > .ant-menu-submenu-title {
    padding-inline: 12px;
    margin: 2px;
  }
  .ant-menu.ant-menu-inline-collapsed > .ant-menu-submenu > .ant-menu-submenu-title {
    padding: 0 13px;
  }
`;

export default NavUserMenu;
