import { format } from 'date-fns'

const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]

export function generateDateText(convertedDate: string): string {
    let result = ""
    const date = Number(convertedDate.split("/")[1])
    const month = Number(convertedDate.split("/")[0])
    const year = Number(convertedDate.split("/")[2])
    const currentDate = format(new Date(), "MM/dd/yyyy").split("/")
    
    const matchedMonthAndYear = year === Number(currentDate[2]) && month === Number(currentDate[0])
    if (matchedMonthAndYear && Number(currentDate[1]) - date === 0) {
        result = "Hari ini"
    } else if (matchedMonthAndYear && Number(currentDate[1]) - date === 1) {
        result = "Kemarin"
    } else {
        result = convertedDate
    }
    return result
}