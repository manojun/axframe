import { alpha, darken } from "./palette/colorUtil"; // Using relative path because the tsconfig isn't set at building less file
import DARK from "./palette/dark";
import LIGHT from "./palette/light";
import { AliasToken } from "antd/lib/theme/interface";

const lightAntdColors = {
  body_background: LIGHT.INK_10,
  scroll_thumb_color: LIGHT.INK_50,
  border_color_base: LIGHT.INK_40,
  border_color_split: LIGHT.INK_30,
  primary_color: LIGHT.BLUE_50,
  primary_color_hover: LIGHT.BLUE_50,
  primary_color_active: LIGHT.BLUE_70,
  primary_color_outline: alpha(LIGHT.BLUE_50, 0.2),
  text_color: LIGHT.INK_70,
  error_color: LIGHT.RED_50,
  success_color: LIGHT.GREEN_50,
  info_color: LIGHT.BLUE_50,
  highlight_color: LIGHT.RED_50,
  disabled_color: alpha(LIGHT.INK_70, 0.5),
  disabled_bg: LIGHT.INK_30,
  warning_color: LIGHT.YELLOW_50,
  white_color: LIGHT.INK_5,
  black_color: "#000",
  heading_color: LIGHT.INK_90,
  label_color: LIGHT.INK_10,
  input_border_color: LIGHT.INK_40,
  select_border_color: LIGHT.INK_40,
  component_background: LIGHT.INK_5,
  item_active_bg: LIGHT.BLUE_50,
  item_hover_bg: LIGHT.BLUE_100,
  menu_item_active_bg: LIGHT.BLUE_50,
  modal_mask_bg: LIGHT.INK_100,
}; //
const lightCustomColors = {
  text_display_color: LIGHT.INK_100,
  text_heading_color: LIGHT.INK_90,
  text_sub_heading_color: LIGHT.INK_50,
  text_body_color: LIGHT.INK_70,
  text_sub_body_color: LIGHT.INK_50,
  link_color: LIGHT.INK_90,
  link_hover_color: lightAntdColors.primary_color,
  link_active_color: LIGHT.INK_100,
  header_background: LIGHT.INK_5,
  component_sub_background: LIGHT.INK_10,
  popover_background: LIGHT.INK_5,
  box_shadow_base: LIGHT.ELEVATION_03,
  box_shadow_layout: LIGHT.ELEVATION_01,
  form_box_bg: LIGHT.INK_5,
};
const lightColors = {
  ...lightCustomColors,

  axf_page_frame_header_bg: LIGHT.INK_5,
  axf_page_frame_footer_bg: LIGHT.INK_5,

  // TabGroup
  axf_border_color: LIGHT.INK_30,
  axf_tabs_background: LIGHT.INK_30,
  axf_tabs_active_background: lightAntdColors.primary_color,
  axf_tabs_hover_background: LIGHT.INK_40,
  axf_tabs_scroll_track_color: LIGHT.INK_30,
  axf_tabs_scroll_thumb_color: LIGHT.INK_40,
  axf_tabs_scroll_thumb_hover_color: LIGHT.INK_50,

  // DataGrid
  axfdg_header_bg: LIGHT.INK_5,
  axfdg_header_color: lightCustomColors.text_heading_color,
  axfdg_header_font_weight: 500,
  axfdg_header_hover_bg: LIGHT.INK_20,
  axfdg_header_group_bg: LIGHT.INK_20,
  axfdg_footer_bg: LIGHT.INK_5,
  axfdg_border_color_base: LIGHT.INK_40,
  axfdg_border_radius: "4px",
  axfdg_row_selector_color: lightAntdColors.component_background,
  axfdg_body_bg: lightAntdColors.component_background,
  axfdg_body_hover_bg: lightAntdColors.item_hover_bg,
  axfdg_body_active_bg: lightAntdColors.item_active_bg,
  axfdg_body_color: lightCustomColors.text_body_color,
  axfdg_scroll_size: "11px",
  axfdg_scroll_track_bg: darken(LIGHT.INK_5, 0.01),

  axfdg_scroll_thumb_radius: "6px",
  axfdg_scroll_thumb_bg: lightAntdColors.scroll_thumb_color,
  axfdg_scroll_thumb_hover_bg: LIGHT.INK_70,
  axfdg_loading_bg: alpha(LIGHT.INK_30, 0.5),
  axfdg_loading_color: alpha(LIGHT.INK_70, 0.1),
  axfdg_loading_second_color: LIGHT.INK_70,
};

// dark component colors
const darkAntdColors: typeof lightAntdColors = {
  body_background: DARK.INK_70,
  scroll_thumb_color: DARK.INK_100,
  border_color_base: DARK.INK_90,
  border_color_split: DARK.INK_80,
  primary_color: DARK.BLUE_50,
  primary_color_hover: DARK.BLUE_50,
  primary_color_active: DARK.BLUE_70,
  primary_color_outline: alpha(DARK.BLUE_50, 0.2),
  text_color: DARK.INK_5,
  error_color: DARK.RED_50,
  success_color: DARK.GREEN_50,
  info_color: DARK.BLUE_50,
  highlight_color: DARK.RED_50,
  disabled_color: alpha(DARK.INK_10, 0.5),
  disabled_bg: DARK.INK_80,
  warning_color: DARK.YELLOW_50,
  white_color: DARK.INK_5,
  black_color: "#000",
  heading_color: DARK.INK_5,
  label_color: DARK.INK_5,
  input_border_color: DARK.INK_80,
  select_border_color: DARK.INK_80,
  component_background: DARK.INK_100,
  item_active_bg: DARK.INK_100,
  item_hover_bg: DARK.INK_70,
  menu_item_active_bg: DARK.INK_100,
  modal_mask_bg: DARK.INK_10,
};
const darkCustomColors: typeof lightCustomColors = {
  text_display_color: DARK.INK_5,
  text_heading_color: DARK.INK_5,
  text_sub_heading_color: DARK.INK_10,
  text_body_color: DARK.INK_20,
  text_sub_body_color: DARK.INK_30,
  link_color: DARK.INK_5,
  link_hover_color: DARK.BLUE_50,
  link_active_color: DARK.INK_100,
  header_background: DARK.INK_100,
  component_sub_background: DARK.INK_90,
  popover_background: DARK.INK_5,

  box_shadow_base: DARK.ELEVATION_03,
  box_shadow_layout: DARK.ELEVATION_01,
  form_box_bg: DARK.INK_90,
};
const darkColors: typeof lightColors = {
  ...darkCustomColors,

  axf_page_frame_header_bg: DARK.INK_70,
  axf_page_frame_footer_bg: DARK.INK_70,

  // TabGroup
  axf_border_color: DARK.INK_70,
  axf_tabs_background: DARK.INK_50,
  axf_tabs_active_background: darkAntdColors.primary_color,
  axf_tabs_hover_background: DARK.INK_80,
  axf_tabs_scroll_track_color: DARK.INK_60,
  axf_tabs_scroll_thumb_color: DARK.INK_80,
  axf_tabs_scroll_thumb_hover_color: DARK.INK_100,

  // DataGrid
  axfdg_header_bg: DARK.INK_90,
  axfdg_header_color: darkCustomColors.text_heading_color,
  axfdg_header_font_weight: 500,
  axfdg_header_hover_bg: DARK.INK_80,
  axfdg_header_group_bg: DARK.INK_80,
  axfdg_footer_bg: DARK.INK_90,
  axfdg_border_color_base: DARK.INK_80,
  axfdg_border_radius: "4px",
  axfdg_row_selector_color: darkAntdColors.component_background,
  axfdg_body_bg: darkAntdColors.component_background,
  axfdg_body_hover_bg: darkAntdColors.item_hover_bg,
  axfdg_body_active_bg: darkAntdColors.item_active_bg,
  axfdg_body_color: darkCustomColors.text_body_color,
  axfdg_scroll_size: "11px",
  axfdg_scroll_track_bg: DARK.INK_90,

  axfdg_scroll_thumb_radius: "6px",
  axfdg_scroll_thumb_bg: darkAntdColors.scroll_thumb_color,
  axfdg_scroll_thumb_hover_bg: DARK.INK_100,
  axfdg_loading_bg: alpha(DARK.INK_50, 0.5),
  axfdg_loading_color: alpha(DARK.INK_70, 0.1),
  axfdg_loading_second_color: DARK.INK_70,
};

const commons = {
  heading_font_family:
    "Inter,-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'",
  border_radius_base: "4px",
  modal_header_height: "40px",

  active: LIGHT.BLUE_50,
  passed: LIGHT.BLUE_30,

  btn_font_size_sm: "12px",
  height_base: "32px",
  height_lg: "40px",
  height_sm: "28px",
  form_item_margin_bottom: "15px",
  error_page_header_color: "#FF4040",
  error_page_color: LIGHT.BLUE_90,
  form_vertical_label_padding: "0 0 4px",
  side_menu_open_width: 280,

  // custom styles
  ui_helper_zindex: 100,
  ui_drag_zindex: 500,
  ui_header_zindex: 900,
  ui_max_zindex: 9999,
};

const commonTokens: Partial<AliasToken> = {
  borderRadius: 5,
  fontSize: 13,
  fontSizeSM: 12,
  fontSizeLG: 14,
  fontFamily:
    "Inter,-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'",
};
const lightTokens: Partial<AliasToken> = {
  colorPrimary: lightAntdColors.primary_color,
  colorBgBase: lightAntdColors.component_background,
  colorTextBase: lightAntdColors.text_color,
  colorBorder: lightAntdColors.border_color_base,
  colorBgContainerDisabled: lightAntdColors.disabled_bg,
};
const darkTokens: Partial<AliasToken> = {
  colorPrimary: darkAntdColors.primary_color,
  colorBgBase: darkAntdColors.component_background,
  colorTextBase: darkAntdColors.text_color,
  colorBorder: darkAntdColors.border_color_base,
  colorBgContainerDisabled: darkAntdColors.disabled_bg,
};

const light = {
  themeType: "LIGHT",
  ...lightColors,
  ...lightAntdColors,
  ...commons,
  token: {
    ...lightTokens,
    ...commonTokens,
  },
}; //

const dark = {
  themeType: "DARK",
  ...darkColors,
  ...darkAntdColors,
  ...commons,
  token: {
    ...darkTokens,
    ...commonTokens,
  },
};

export const themePalette = {
  light,
  dark,
};

export type Theme = typeof dark;
export type ThemeType = keyof typeof themePalette;

export default light;
