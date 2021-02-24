export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    // let tok = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InJpbmRhIiwiaWF0IjoxNTk4MjkwNzIyfQ.3CYjOb0KZeOcuFSyiw8QqEXks3udR8vacvHpuwvbRJ0'

    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token, 'Content-Type':'application/json' };
    } else {
        return {};
    }
}