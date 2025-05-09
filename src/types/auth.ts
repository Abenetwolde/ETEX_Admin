// Define types for the login request and response
interface LoginRequest {
    name: string;
    phone_number: string;
    password: string;
  }
  
  interface LoginResponse {
    auth_token: string;
  }