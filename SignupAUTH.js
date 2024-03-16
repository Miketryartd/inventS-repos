document.addEventListener('DOMContentLoaded', function() {
    // Add event listener to the sign-up form
    document.getElementById('SUFORM').addEventListener('submit', function(trigger) {
        trigger.preventDefault();

        const SIGNUP_EMAIL_IDINP = document.getElementById('signupEMAILinput').value;
        const SIGNUP_USERNAME_IDINP = document.getElementById('signupUSERinput').value;
        const SIGNUP_PASSWORD_IDINP = document.getElementById('signupPASSWORDinput').value;
        const User_Array_DATA = JSON.parse(localStorage.getItem('Users')) || [];

        if (SIGNUP_EMAIL_IDINP.trim() === '' || SIGNUP_USERNAME_IDINP.trim() === '' || SIGNUP_PASSWORD_IDINP.trim() === '') {
            alert('Please fill all the inputs!');
            return;
        } else {
            const existingUSER = User_Array_DATA.find(user => user.username === SIGNUP_USERNAME_IDINP && user.email === SIGNUP_EMAIL_IDINP);
            if (existingUSER) {
                alert('User already exists. Please log in instead.');
            } else {
                const newUser = {
                    username: SIGNUP_USERNAME_IDINP,
                    password: SIGNUP_PASSWORD_IDINP,
                    email: SIGNUP_EMAIL_IDINP
                };
                User_Array_DATA.push(newUser);
                localStorage.setItem('Users', JSON.stringify(User_Array_DATA));

                // Save action to the user's activity log
                saveUserAction(newUser.username, 'Sign Up');

                window.location.href = 'login.html';
            }
        }
    });

    // Function to save user actions to the activity log
    function saveUserAction(username, action) {
        const activityLog = JSON.parse(localStorage.getItem('ActivityLog')) || [];
        const timestamp = new Date().toISOString();
        const userAction = { username, action, timestamp };
        activityLog.push(userAction);
        localStorage.setItem('ActivityLog', JSON.stringify(activityLog));
    }
});


document.getElementById('logout').addEventListener('click', function(){
    removeUserAction('Log in');
    window.location.href = 'login.html';
})

function removeUserAction(action){
    const activityLog = JSON.parse(localStorage.getItem('ActivityLog')) || [];
    const filteredLog = activityLog.filter(entry => entry.action !== action);
    localStorage.setItem('ActivityLog', JSON.stringify(filteredLog));
}