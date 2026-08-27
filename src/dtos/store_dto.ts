export interface store_response_dto {
    store_id: string
    store_name: string
    store_description: string
    store_theme_color: string | null
    user_id: string
    created_at: Date
    modified_at: Date
    currency? : string
    social_links? : string[]
    sub_domain : string
    is_published :boolean
}