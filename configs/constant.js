module.exports = {
    MESSAGE: {
        MISSING: {
            KEY: "API key is missing",
            USER: "User not found.",
        },
        INVALID: {
            CC: "Credit card data invalid.",
            KEY: "Invalid API key.",
            FIELD_TYPE: "Invalid fields type.",
        },
        ERROR: {
            FIELD_PROVIDE: "Please provide *** fields.",
            INTERNAL: "Something went wrong. Please try again later.",
        }
    },
    PAGING: {
        OFFSET: 0,
        LIMIT: 30,
        PAGE: 1,
    },
    API_PATH: '/api/v1',
    SEARCH: {
        status: true
    },
    MONGO: {
        SORT: [1, -1], 
        UPDATE_BY_ID: 'findByIdAndUpdate',
        UPDATE: 'update'
    },
}