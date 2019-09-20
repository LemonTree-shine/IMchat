
export default {
    path:"/root",
    childRoutes: [
        {
            path: `one`,//用户1
            getComponent: (nextState, cb) => {
                require.ensure([], (require) => {
                    cb(null, require("../page/chatOne/index").default)
                }, "home")
            }
        },
        {
            path: `two`,//用户2
            getComponent: (nextState, cb) => {
                require.ensure([], (require) => {
                    cb(null, require("../page/chatTwo/index").default)
                }, "home")
            }
        },
    ]
};