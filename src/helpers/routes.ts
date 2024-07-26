import { homeView } from "../views/home/home";
import { notFoundView } from "../views/not-found/not-found";
import { upFileView } from "../views/up-file/upFileView";

export const routes = {
    public: [
        { path: "/not-found", component: notFoundView },
        { path: "/up-file", component: upFileView },
        { path: "/home", component: homeView }
    ]
  };