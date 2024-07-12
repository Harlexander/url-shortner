export interface LinkType {
    short_url : string,
    slug : string,
    original_url : string,
    clicks : number,
    created_at ?: Date,
    user_id ?: number,
    link_clicks ?: LinkClicks[]
}

export interface LinkClicks {
    country : string, 
    referrer : string
}