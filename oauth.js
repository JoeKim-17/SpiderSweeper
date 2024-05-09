
const server = 'http://localhost:8080'


let username = '';
let accessToken = '';

async function oauthSignIn() {
    var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

    var form = document.createElement('form');
    form.setAttribute('method', 'GET');
    form.setAttribute('action', oauth2Endpoint);

    var params = {
        'client_id': '389577083888-tuvvlhaf0ka80p9tqrs8vmrfp106e2nq.apps.googleusercontent.com',
        'redirect_uri': 'http://localhost:5500/signin.html',
        'response_type': 'token',
        'scope': 'https://www.googleapis.com/auth/userinfo.profile',
        'include_granted_scopes': 'true',
        'state': 'pass-through value'
    };

    for (var p in params) {
        var input = document.createElement('input');
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', p);
        input.setAttribute('value', params[p]);
        form.appendChild(input);
    }

    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    let ans = await form.submit();
    await new Promise(resolve => {
        console.log('hewo');
        setTimeout(() => {
            console.log('hewo again');
            resolve('jank');
        }, 1000);
    });
    //url has the token

    //need to grab the token

    //THEN send to api

    await ans
    console.log('COTNINUE');
    return true
}


async function handleRedirect(resp) {
    let hash = location.hash.substring(1);
    let fragmentParams = new URLSearchParams(hash);
    accessToken = fragmentParams.get('access_token');
    console.log('token ', accessToken);

    // POPULATES DB AND RETURNS USERNAME
    let s = `${server}/sign-in`
    console.log(s);
    if (accessToken == undefined || accessToken == null) {
        console.log('empty');
        urlParams = new URLSearchParams(window.location.search);
        console.log(urlParams);
        return
    }
    try {
        let user = await fetch('http://localhost:8080/sign-in', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToken,
                'Access-Control-Allow-Origin': '*',
            } // Convert the data object to JSON
        }).then(response => {
            console.log('Sent req');
            if (!response.ok) {
                throw new Error(response['message']);
            }
            return response.json();
        }).catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    } catch (error) {
        console.log('cant connect ', error);
    }
    return true
}
//do bunch of oatuh shandez
//returns token url
//IDEALLY grab token, send to API
//REALITY, since oauth redirects, it goes somehwere, comes back and THEN it add the token to url
//MEANWHILE it sends to our backend/api with nothing

console.log(location.hash);
if (location.hash) {
    console.log('TIME to cook');
    handleRedirect();
}

document.getElementById("loginButton").addEventListener("click", oauthSignIn);
