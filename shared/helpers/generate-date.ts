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

export function generateDateText2(data: { date: Date }) {
    let result = ""

    // Time
    const formatedDate = format(data.date, "MM/dd/yyyy")
    const date = formatedDate.split("/")[1]
    const month = formatedDate.split('/')[0]
    const year = formatedDate.split('/')[2]

    // Current time
    const current = format(new Date(), "MM/dd/yyyy")
    const currentDate = current.split("/")[1]
    const currentMonth = current.split('/')[0]
    const currentYear = current.split('/')[2]

    const matchedMonthAndYear = currentMonth === month && currentYear === year
    if (matchedMonthAndYear && Number(currentDate) - Number(date) === 0) {
        result = data.date.toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit"
        })
    } else if (matchedMonthAndYear && Number(currentDate) - Number(date) === 1) {
        result = "Kemarin"
    } else {
        result = formatedDate
    }

    return result
}