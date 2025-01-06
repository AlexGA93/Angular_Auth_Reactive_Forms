export interface LoginUserType {
    email:      string;
    password?:   string;
}

export interface UserType extends LoginUserType {
    checked?:    boolean;
    password2?:  string;
    username:   string;
}

export interface AuthenticationResponseType {
    ok_status:  boolean;
    token:      string;
}

export interface VerificationResponseType extends UserType, AuthenticationResponseType {

}