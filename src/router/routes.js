
const routes = [
  {
    path: "/",
    component: () => import("layouts/DefaultLayout.vue"),
    children: [
      {
        path: "/",
        name: "sign-in",
        component: () => import("src/pages/auth/LoginPage.vue"),
        meta: {
          requireGuest: true,
        },
      },
      {
        path: "/sign-up",
        name: "sign-up",
        component: () => import("src/pages/auth/RegisterPage.vue"),
        meta: {
          requireGuest: true,
        },
      },
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: "/notes",
        meta: {
          requiresAuth: true,
          transition: "slide-right",
        },
        children: [
          {
            path: "",
            name: "notes",
            component: () =>
              import(
                /* webpackChunkName: "notes" */
                /* webpackMode: "lazy" */
                /* webpackInclude: /\.vue$/ */
                "src/pages/notes/NotesPage.vue"
              ),
            meta: {
              requiresAuth: true,
            },
          },
          {
            path: "note-details/:slug",
            name: "note-details",
            component: () =>
              import(
                /* webpackChunkName: "noteDetails" */
                /* webpackMode: "lazy" */
                /* webpackInclude: /\.vue$/ */
                "src/pages/notes/noteDetails.vue"
              ),
            meta: {
              requiresAuth: true,
            },
          },
          {
            path: "create",
            name: "create-note",
            component: () =>
              import(
                /* webpackChunkName: "create-note" */
                /* webpackMode: "lazy" */
                /* webpackInclude: /\.vue$/ */
                "src/pages/notes/CreateNotePage.vue"
              ),
            meta: {
              requiresAuth: true,
            },
          },
          {
            path: "edit/:slug",
            name: "edit-note",
            component: () =>
              import(
                /* webpackChunkName: "edit-note" */
                /* webpackMode: "lazy" */
                /* webpackInclude: /\.vue$/ */
                "src/pages/notes/CreateNotePage.vue"
              ),
            meta: {
              requiresAuth: true,
            },
          },

        ],
      },

    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
