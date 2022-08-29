const testing = $('#Testing')[0];
const OpenChrome = $('#OpenChrome')[0];
const Service = $('#Service')[0];
const saveChanges = $('#saveChanges');
const URL = $('#URL');
const PORT = $('#PORT');
const addRole = $('#addRole');

$(()=>{

$.get('/uservariables', function(data){
    console.log(data)
    let settings = data.variables.settings;
    let dataSettings = data.variables.dataSettings;
    settings.forEach(element => {
        $(`#${element.name}`)[0].checked = JSON.parse(element.value);
    });
    dataSettings.forEach(element => {
        $(`#${element.name}`).val(element.value);
    });
});

})



saveChanges.on('click', (e)=>{
    e.preventDefault();

    save();
});

addRole.on('click',(e)=>{
    e.preventDefault();
    addRoleInput();
})

document.addEventListener("keydown", function(e) {
    if ((window.navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)  && e.keyCode == 83) {
      e.preventDefault();
      save();
    }
  }, false);

function save(){
    var data = {
        "settings":[{"name":"Service","value":Service.checked},{"name":"OpenChrome","value":OpenChrome.checked},{"name":"Testing","value":testing.checked}], 
    "dataSettings":[{"name":"URL", "value":URL.val()},{"name":"PORT", "value":PORT.val()}, {"name": "roles", "value": getRoles()}]};
    console.log(data);

    $.ajax({
        type: "POST",
        url: '/uservariables',
        data: data,
      });

      document.location.reload()
};

function getRoles(){
    const roles = $(".role")

    let rolesList = []
    for(let i= 0; i < roles.length; i++){
        if(roles[i].value !== ''){
            rolesList.push(roles[i].value)
        }
    }
    return rolesList;
}
function addRoleInput(){
    $("#roles").append(`
    <div>
        <input class="role">
        </div>
        `)
}

function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
  }

