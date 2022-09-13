

$(()=>{

const email = document.getElementById('email');
const password = document.getElementById('password');

    $('#submit').on('click',()=>{
        $.ajax({
            type: 'post',
            url: '/login',
            data: {email: email.value, password: password.value},
            success: function(output, status, xhr) {
                console.log(xhr.toString());
                console.log(`=============\n${output}`);
                console.log(`==============\n${status}`)
            },
            cache: false
        });
        console.log('here');
    })    
   
});

