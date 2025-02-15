class ApiUnknownError extends Error {
    status: number;
    constructor(message = 'Ocorreu um erro desconhecido na API', status = 500) {
      super(message);
      this.name = 'ApiUnknownError';
      this.status = status;
    }
  }
  
  export default ApiUnknownError;
  