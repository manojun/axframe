import * as React from "react";
import {
  AXFIconsArchiveDuo,
  AXFIconsExampleDuo,
  AXFIconsGearShapeDuo,
  AXFIconsMegaphoneDuo,
  AXFIconsModuleDuo,
  AXFIconsPaperPenDuo,
  AXFIconsPermissionDuo,
  AXFIconsSystemAppDuo,
  AXFIconsSystemCommonDuo,
  AXFIconsSystemMenuDuo,
  AXFIconsSystemUserDuo,
  AXFIconsSystemUserGroupDuo,
} from "@axframe/axficons";

export enum MenuIconType {
  Default,
  Example,
  Notice,
  Archive,
  Survey,
  System,
  SystemCommonCode,
  SystemMenu,
  SystemProgram,
  SystemUser,
  SystemUserGroup,
  Permission,
}

interface Props {
  role?: string;
  typeName: keyof typeof MenuIconType;
  fontSize?: number;
  color?: string;
  secondColor?: string;
  style?: React.CSSProperties;
  className?: string;
}

export const menuIcons = Object.values(MenuIconType).filter((v) => isNaN(Number(v)));

export function MenuIcon({ typeName, ...rest }: Props) {
  rest.className = "ant-menu-item-icon";
  rest.secondColor = "#fff";
  switch (typeName) {
    case "Example":
      return <AXFIconsExampleDuo {...rest} />;
    case "Notice":
      return <AXFIconsMegaphoneDuo {...rest} />;
    case "Archive":
      return <AXFIconsArchiveDuo {...rest} />;
    case "Survey":
      return <AXFIconsPaperPenDuo {...rest} />;
    case "System":
      return <AXFIconsGearShapeDuo {...rest} />;
    case "SystemCommonCode":
      return <AXFIconsSystemCommonDuo {...rest} />;
    case "SystemMenu":
      return <AXFIconsSystemMenuDuo {...rest} />;
    case "SystemProgram":
      return <AXFIconsSystemAppDuo {...rest} />;
    case "SystemUser":
      return <AXFIconsSystemUserDuo {...rest} />;
    case "SystemUserGroup":
      return <AXFIconsSystemUserGroupDuo {...rest} />;
    case "Permission":
      return <AXFIconsPermissionDuo {...rest} />;
    case "Default":
    default:
      return <AXFIconsModuleDuo {...rest} />;
  }
}
