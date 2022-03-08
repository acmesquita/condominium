export abstract class Result {
  success: boolean
  fail: boolean
  payload: any

  resolve(payload: any): void {
    this.payload = payload
    this.success = true
    this.fail = false
  }

  reject(payload: any): void {
    this.payload = payload
    this.fail = true
    this.success = false
  }
}