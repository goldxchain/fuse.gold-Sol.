<template>
	<div class="modal modal-login" id="ModalLogin">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <button type="button" class="close" v-on:click="DismissModal">&times;</button>
                    <h4>Login</h4>
                    <div class="modal-info">
                        <div class="input-outer">
                            <input class="form-control" v-model="btcAmount" type="text" name="" placeholder="Enter your Email">
                        </div>
                        <div class="input-outer">
                            <input class="form-control" v-model="btcAmount" type="text" name="" placeholder="Enter your password">
                        </div>
                        <a href="#" class="btn-main" >Login</a>
                    </div>
                </div>              
            </div>
        </div>
    </div>
    <div class="modal modal-login modal-register" id="ModalRegister">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <button type="button" class="close" v-on:click="DismissModal">&times;</button>
                    <h4>Registration</h4>
                    <div class="modal-info">
                        <div class="input-outer">
                            <input class="form-control" v-model="btcAmount" type="text" name="" placeholder="Enter your Email">
                        </div>
                        <div class="input-outer">
                            <input class="form-control" v-model="btcAmount" type="text" name="" placeholder="Enter your password">
                        </div>
                        <label class="pwdStr">Password Strength: <span class="red">Weak</span></label>
                         <div class="input-outer">
                            <input class="form-control" v-model="btcAmount" type="text" name="" placeholder="Reenter your password">
                        </div>
                        <a href="#" class="btn-main">Register</a>
                    </div>
                </div>              
            </div>
        </div>
    </div>
</template>
<style scoped>
.modal .close{
    color: #fff;
    position: absolute;
    top: 0px;
    right: 10px;
    border: none !important;
}
.modal .close:focus{
    border: none;
    box-shadow: none;
}
.modal .modal-content{
    background-color: #000000;
    
}
.modal{
    background-color: rgba(220,185,75,0.8);
    transition: all 0.5s ease;
}
.modal-login .modal-dialog .modal-body{
   padding: 30px;
   
}
.modal-login .modal-dialog{
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    max-width: 400px;
}
.modal-login .modal-info{
    margin-top: 20px;
}
.modal-login .btn-main{
    margin-top: 20px;
    width: 70%;
    font-weight: 600;
    padding: 8px 14px;
    text-align: center;
    border-radius: 4px;
}
.modal-register .pwdStr{
    margin: 0;
    color: #a0a0a0;
    font-weight: 400;
    font-family: "Palanquin";
}
.pwdStr span{
    font-weight: 500;
}
.pwdStr .red{
    color: red;
}
</style>
<script>
export default {
    name: 'Footer',
    methods: {
        DismissModal(){
            document.getElementById('ModalLogin').style.display="none";
            document.getElementById('ModalRegister').style.display="none"
        }
    },
}

</script>

