class ApiError extends Error{
    constructor(
        statusCode,
        message = "Random Error Occured"
    ){
        super(message)
        this.statusCode = statusCode;
        this.success = false;
    }
}

module.exports = ApiError