export abstract class Result<T> {
  success: boolean
  fail: boolean
  payload: T

  resolve(payload: T): void {
    this.payload = payload
    this.success = true
    this.fail = false
  }

  reject(payload: T): void {
    this.payload = payload
    this.fail = true
    this.success = false
  }
}