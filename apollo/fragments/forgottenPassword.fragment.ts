import { gql } from '@apollo/client';

export const FORGOTPASSWORD_FRAGMENT = gql`
    fragment ForgotPasswordResponseFragment on ForgotPasswordResponse {
        status
        message
    }
`;
