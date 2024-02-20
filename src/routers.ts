import * as Routes from "./api/v1/routers";

export const routes = [
  {
    path: "/api/v1/users",
    handler: Routes.UserRouter
  },
  {
    path: "/api/v1/books",
    handler: Routes.BookRouter
  },
  {
    path: "/api/v1/auth",
    handler: Routes.AuthRouter
  }
]
