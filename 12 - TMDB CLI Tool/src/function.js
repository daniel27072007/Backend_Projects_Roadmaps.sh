export const queryCategoryConverter = (category)=>{
    if(category === 'playing'){
        const categoryFix = 'now_playing'
        return categoryFix
    }
    if(category === 'top'){
        const categoryFix = 'top_rated'
        return categoryFix
    }
    return category
}