// i will have the logic to tranfer the object

exports.userResponse = (users)=>{
    let userResponse = [];
    // Array manipulation
    users.forEach(user =>{
        // each itration push into the array
        userResponse.push({
            name : user.name,
            userId : user.userId,
            email : user.email,
            userType : user.userType,
            userStatus : user.userStatus
        });
    });

    return userResponse;
}
