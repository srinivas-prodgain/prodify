

export const getTheCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'long',
        day: 'numeric'
    })
}