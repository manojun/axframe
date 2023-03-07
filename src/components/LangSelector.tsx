import * as React from "react";
import { IconText } from "@core/components/common";
import { Dropdown } from "antd";
import { MenuProps } from "antd/lib/menu";
import { useAppStore } from "stores";
import { AXFILanguage } from "@axframe/icon";

interface Props {
  hideLabel?: boolean;
}

const LanguageLabel = {
  en: "English",
  ko: "한국어",
};

function LangSelector({ hideLabel }: Props) {
  const currentLanguage = useAppStore((s) => s.currentLanguage);
  const setLanguage = useAppStore((s) => s.setLanguage);

  const onClickMenu: MenuProps["onClick"] = React.useCallback(
    (info) => {
      setLanguage(info.key);
    },
    [setLanguage]
  );

  return (
    <Dropdown
      menu={{
        onClick: onClickMenu,
        items: [
          { key: "en", label: LanguageLabel.en },
          { key: "ko", label: LanguageLabel.ko },
        ],
      }}
      trigger={["click"]}
    >
      <IconText icon={<AXFILanguage />} iconSize={20} role={"lang-selector"}>
        {!hideLabel && LanguageLabel[currentLanguage]}
      </IconText>
    </Dropdown>
  );
}

export { LangSelector };
