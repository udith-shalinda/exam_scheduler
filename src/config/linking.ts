const config = {
    screens: {
        Home: "home",
        Login: {
            path: "Login"
        },
        Details: {
            path: "Details/:id",
            parse: {
                id: (id: any) => `${id}`
            }
        }
    }
}

export const linking = {
    prefixes: ["demo://app"],
    config
}