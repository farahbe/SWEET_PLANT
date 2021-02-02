export const signinadmin = (admin) => ({
    type: "SIGNINADMIN",
    token: admin.token,
    email: admin.email,
    id: admin.id,
})

export const logoutAdmin = () => ({
    type: "SIGNOUTADMIN"
})


