const submit = $('#Submit')
const required = $("input[required]");
$(()=>{

  

    console.log(required)



    required.on('keydown',()=>{
        let allNonInvalidFields = 0;
        
        for(let i = 0; i < required.length; i++){
            if(required[i].value == ''){
                required[i].classList.add("invalid");
            }
            if(required[i].value != ""){
                required[i].classList.remove("invalid")
                allNonInvalidFields++;
            }
        }

        if(allNonInvalidFields == 5){
            submit.addClass('enabled');
            submit.removeClass('disabled');

        }
        else{
            submit.addClass('disabled');
            submit.removeClass('enabled');
        }
        
    })

})


submit.on('click',(e)=>{
    e.preventDefault();
    if(!submit.hasClass("disabled")){
        let data = {
            "name":$("input[placeholder='Name']").val(),
            "lastName":$("input[placeholder='Last Name']").val(),
            "email":$("input[placeholder='Email']").val(),
            "password":$("input[placeholder='Password']").val(),
            "passwordConfirm":$("input[placeholder='Confirm Password']").val()}
       
       console.log(data)
        $.ajax({
            type: "POST",
            url: '/signup',
            data: data,
            success: function(result){
                document.location.href = '/';
            }
          });
    
    }
    
})
