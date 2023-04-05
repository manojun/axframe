import EN from "./en";
import { KO_pages } from "./pages";
import { KO_button } from "./button";
import { KO_label } from "./label";
import { KO_msg } from "./msg";
import { KO_pageTab } from "./pageTab";
import { EN_apiErrMsg } from "./error";
import { KO_common } from "./common";

const KO: typeof EN = {
  appName: "AXFrame",
  button: KO_button,
  label: KO_label,
  pageTab: KO_pageTab,
  pages: KO_pages,
  msg: KO_msg,
  apiErrMsg: EN_apiErrMsg,
  common: KO_common,
};
export default KO;
