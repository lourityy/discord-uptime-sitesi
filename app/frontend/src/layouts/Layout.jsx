import { isLogin } from "./Config/isLogin";
import PanelLayout from "./PanelLayout";
import MainLayout from "./MainLayout";

export const Layout = isLogin ? PanelLayout : MainLayout;