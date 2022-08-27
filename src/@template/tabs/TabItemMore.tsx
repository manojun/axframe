import { Dropdown, Menu } from "antd";
import * as React from "react";
import styled from "@emotion/styled";
import { RFIArrowDown } from "react-frame-icon";
import { SMixinFlexRow } from "styles/emotion";
import { useTabGroupController } from "@controller/tabs/TabGroupController";
import { mergeProps } from "utils/object";

interface Props {}

function TabItemMore(props: Props) {
  const { pagesValues } = mergeProps(props, useTabGroupController());

  return (
    <Dropdown
      overlayClassName={"tab-item-more-dropdown"}
      overlay={
        <Menu
          items={pagesValues.map(([k, v]) => ({
            key: k,
            label: v.label,
          }))}
        />
      }
      trigger={["click"]}
    >
      <TabItemMoreContainer>
        <RFIArrowDown fontSize={18} />
      </TabItemMoreContainer>
    </Dropdown>
  );
}

const TabItemMoreContainer = styled.div`
  ${SMixinFlexRow("center", "center")};
  flex: none;
  width: 40px;
  height: 33px;
  cursor: pointer;
  position: relative;

  &:after {
    content: "";
    display: block;
    position: absolute;
    left: -20px;
    top: 0;
    width: 20px;
    height: 30px;
    background: linear-gradient(to right, #ffffff00, #ffffff);
  }
`;

export default TabItemMore;
