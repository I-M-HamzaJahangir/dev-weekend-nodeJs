const { createUserValidationSchema } = require("./validations/user.validations");



const data = {
    name: " Hamza Jahangir ",
    email: " HAMZA@gmail.com ",
    password: "12345678"
}


const result = createUserValidationSchema.safeParse(data)

if (!result.success) {

    const errors = result.error.issues.map((issue) => ({
        field: issue.path[0],
        message: issue.message
    }))

    console.log(errors)
}
