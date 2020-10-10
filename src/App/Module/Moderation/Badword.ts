export default class Badwords {
  public readonly badword: string[]

  constructor(badword: string[]) {
    this.badword = badword
  }

  public addBadowrd(text: string): void {
    this.badword.push(text)
  }

  public removeBadword(searchable: string): void {
    this.badword.splice(this.badword.indexOf(searchable), 1)
  }

  public hasBadword(searchable: string): boolean {
    return this.badword.includes(searchable)
  }

  public getBadword(text: string) {
    return this.badword
      .filter(word => {
        const regex = new RegExp(`\\b${word.replace(/(\W)/g, '\\$1')}\\b`, 'gi')
        return regex.test(text)
      })
  }
}
