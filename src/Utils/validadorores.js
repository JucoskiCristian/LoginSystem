const validadeEmail = (email) =>{
    return email?.toString().includes('@') && email?.toString().includes('.com')
}

const validadePassword = (pass) =>{
   return pass?.toString().length >= 6 && pass?.toString().length <= 20
}

export{validadeEmail, validadePassword }