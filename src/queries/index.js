import { gql } from 'apollo-boost';

////////////////////////////////////////////// COMMENT QUERIES/////////////////////////////////////////////////

export const ADD_COMMENT = gql`
    mutation($author: Int!, $content: String!, $post_id: ID!) {
        addComment(author: $author, content: $content, post_id: $post_id) {
            author
            content
        }
    }
`;
////////////////////////////////////////////// POST QUERIES/////////////////////////////////////////////////

export const GET_POSTS = gql`
    query {
        posts {
            _id
            title
            content
        }
    }
`;

export const GET_POST = gql`
    query($_id: ID!) {
        post(_id: $_id) {
            _id
            title
            content
        }
    }
`;

export const ADD_POST = gql`
    mutation($title: String!, $content: String!) {
        addPost(title: $title, content: $content) {
            title
            content
        }
    }
`;

export const UPDATE_POST = gql`
    mutation($_id: ID!, $title: String!, $content: String!){
        updatePost(_id: $_id, title: $title, content: $content) {
            _id
            title
            content
        }
    }
`;

export const DELETE_POST = gql`
    mutation($_id: ID!){
        deletePost(_id: $_id) {
            _id
        }
    }
`;

////////////////////////////////////////////// USER QUERIES/////////////////////////////////////////////////

export const SIGNUP_USER = gql`
    mutation($firstName: String!, $lastName: String!, $email: String!, $userName: String!, $password: String!, $role: String){
        signupUser(firstName: $firstName, lastName: $lastName, email: $email, userName: $userName, password: $password, role: $role){ token }
    }
`;


export const GET_CURRENT_USER = gql`
    query {
        getCurrentUser {
            firstName
            lastName
            joinDate
            userName
            email
            profileImage
        }
    }
`;

export const EDIT_PROFILE = gql`
    mutation($email: String!, $bio: String!){
        editProfile(email: $email, bio: $bio){
            bio
        }
    }
`;

export const SET_PROFILE_IMAGE = gql`
    mutation($email: String!, $profileImage: String!){
        setProfileIMG(email: $email, profileImage: $profileImage){
            profileImage
        }
    }
`;

export const SIGNIN_USER = gql`
    mutation($userName: String!, $password: String!){
        signinUser(userName: $userName, password: $password){ token }
    }
`;


export const CHANGE_EMAIL = gql`
    mutation($currentEmail: String!, $newEmail: String!){
        changeEmail(currentEmail: $currentEmail, newEmail: $newEmail){
            email
        }
    }
`;

export const CHANGE_PASSWORD = gql`
    mutation($email: String!, $password: String!){
        changePassword(email: $email, password: $password){
            email
        }
    }
`;

export const RESET_PASSWORD = gql`
    mutation($email: String!){
        passwordReset(email: $email){
            email
        }
    }
`;

export const GET_USER_PROFILE = gql`
    query {
        getUserProfile {
            bio
            profileImage
        }
    }
`;

export const GET_ALL_USERS = gql`
    query {
        getAllUsers {
            firstName
            lastName
            bio
            profileImage
            userName
            email
            _id
            role
        }
    }
`;

export const PROFILE_PAGE = gql`
    query($userName: String!) {
        profilePage(userName: $userName) {
            firstName
            lastName
            bio
            profileImage
        }
    }
`;