document.addEventListener('DOMContentLoaded', function() {
    // Add event listener to the login form
    document.getElementById('loginForm').addEventListener('submit', function(trigger) {
        trigger.preventDefault();
        console.log("Login form submitted");

        const LOGINEMAIL = document.getElementById('loginEMAILinput').value;
        const LOGINPASSWORD = document.getElementById('loginPASSWORDinput').value;
        const User_Array_DATA = JSON.parse(localStorage.getItem('Users')) || [];

        if (LOGINEMAIL.trim() === '' || LOGINPASSWORD.trim() === '') {
            alert('Please fill all the inputs!');
            return;
        }

        const user = User_Array_DATA.find(user => user.email === LOGINEMAIL && user.password === LOGINPASSWORD);
        if (user) {
            // Save action to the user's activity log
            saveUserAction(user.username, 'Log In');
            
            window.location.href = 'home.html';
        } else {
            alert('Invalid credentials.');
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