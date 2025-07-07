import { gql } from '@apollo/client';
import { FORGOTPASSWORD_FRAGMENT } from '@/apollo/fragments/forgottenPassword.fragment';

export const FORGOTTEN_PASSWORD_MUTATION = gql`
    ${FORGOTPASSWORD_FRAGMENT}
    mutation forgotPassword($input: ForgotPasswordInput!) {
        forgotPassword(input: $input) {
            ...ForgotPasswordResponseFragment
        }
    }
`;
