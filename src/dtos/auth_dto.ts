export interface signup_response_dto {
    user_id : string
    user_name? : string,
    email : string,

    created_at : Date,
    created_by : string,
    modified_at : Date
    modified_by : string
}