export const getDayOfDate = (date: string) => {
    const day =date.toString().trim().split('T').shift()
    return day
}