class ApiError extends Error {
  status: number;
  detail?: string;
  type?: string;
  constructor(message: string, status: number, detail?: string, type?: string) {
    super(message);
    this.status = status;
    this.detail = detail;
    this.type = type;
  }
}

export default ApiError;