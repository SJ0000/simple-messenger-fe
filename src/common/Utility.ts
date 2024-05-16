

export default class Utility{

  public static getFormattedDate(date: Date): string {
    const d = new Date(date)
    const year = d.getFullYear()
    const month = this.add0IfLessThan10(d.getMonth())
    const day = this.add0IfLessThan10(d.getDay())
    const hour = this.add0IfLessThan10(d.getHours())
    const minutes = this.add0IfLessThan10(d.getMinutes())
    return `${year}-${month}-${day} ${hour}:${minutes}`
  }

  public static add0IfLessThan10(num: number): string {
    if (num <= 9)
      return `0${num}`
    return `${num}`
  }
}
