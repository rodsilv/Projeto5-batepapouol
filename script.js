
let localmsg = [{
    from: "João",
    to: "Todos",
    text: "entra na sala...",
    type: "status",
    time: "08:01:17"
}];


function logarnasala(){
    do { usuario = prompt("Digite o seu nome");}
    while (usuario === "");
    const nome = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", {name: usuario});
    nome.catch(logarnasala);
}


function ficarlogado(){
axios.post("https://mock-api.driven.com.br/api/v6/uol/status", { name: usuario });
}


function pegarmsgnoservidor(){
    const promessa = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promessa.then(msgchegaram);
    promessa.catch(erropegarmsg);
 }
 

function msgchegaram(resposta){
    document.querySelector(".local-feed").innerHTML = '';
     console.log('msg chegou!!');
     console.log(resposta.data);
     localmsg = resposta.data
     localmsg.map((k)=>{
        if (k.type==="status"){
            let inorout = k.from
            let texto = k.text
            let hora = k.time
            msgstatus(inorout,texto,hora)}
        else if(k.type==="message"){
                let inorout =k.from
                let hora = k.time
                let texto = k.text
                let quem = k.to
                msgdopovo(inorout,hora,texto,quem)}
                else if(k.type==="private_message"){
                    let inorout =k.from
                    let hora = k.time   
                    let texto = k.text
                    let quem = k.to
                    msgpvt(inorout,hora,texto,quem)}
})
msgfinal();
}



function msgstatus(inorout,texto,hora){
    document.querySelector(".local-feed").innerHTML +=`
    <div data-test="message" class="msgserve"> <div class="hora"> (${hora}) </div> <div class="inorout"> ${inorout} </div> <div class="status"> ${texto} </div></div>
    `}


function msgdopovo(inorout,hora,texto,quem){
        document.querySelector(".local-feed").innerHTML +=`
        <div data-test="message" class="msgserve povo"> <div class="hora"> (${hora}) </div> <div class="inorout"> ${inorout}  </div> <p class="status2"> para</p> <div class="inorout"> ${quem}: </div> <div class="status"> ${texto} </div></div>
        `}


function msgpvt(inorout,hora,texto,quem){
    document.querySelector(".local-feed").innerHTML +=`
    <div data-test="message" class="msgserve  pvt"> <div class="hora"> (${hora}) </div> <div class="inorout"> ${inorout}  </div> <p class="status2"> para</p> <div class="inorout"> ${quem}: </div> <div class="status"> ${texto} </div></div>
    `}


function erropegarmsg(erro){
    console.log('erro ao pegar msg');
    console.log(erro);
    relogar();
}


function enviarmsg(){
    let newmsg = document.querySelector(".escreva-aqui input").value
    let objmsg = {
        from:usuario, 
        to:"Todos",
        text:newmsg,
        type:"message"
    }
    axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", objmsg).then(pegarmsgnoservidor)
    document.querySelector(".escreva-aqui input").value = "" 
}



function msgfinal(){
const elementoQueQueroQueApareca = document.querySelector('.msgserve');
elementoQueQueroQueApareca.scrollIntoView();
}

function relogar(){
    window.location.reload();
}

logarnasala();
pegarmsgnoservidor();
setInterval(ficarlogado, 5000);
setInterval(pegarmsgnoservidor, 3000);
wgadsge