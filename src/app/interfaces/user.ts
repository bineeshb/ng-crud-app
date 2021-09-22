export interface LoginRequest {
  username: string;
  password: string;
}

export interface SignupRequest extends LoginRequest {
  name: string;
}

export interface LoginResponse {
  userName: string;
  role: string;
}
