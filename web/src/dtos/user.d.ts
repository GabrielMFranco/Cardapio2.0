type UserAPIRole = "CUSTOMER" | "ADMIN"

type UserAPIResponse = {
    token: string
    user:{
        id: string
        user: string
        role: UserAPIRole
    }
}