
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
    nome.then(loguin);
}

logarnasala();

function ficarlogado(){
axios.post("https://mock-api.driven.com.br/api/v6/uol/status", {name: usuario});
}

setInterval(ficarlogado, 5000);

pegarmsgnoservidor();

function pegarmsgnoservidor(){
   const promessa = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
   promessa.then(msgchegaram);
   promessa.catch(erropegarmsg);
}

function msgchegaram(resposta){
    console.log('msg chegou!!');
    console.log(resposta.data);
    localmsg = resposta.data;
    mostrarmsg(resposta.data);
    
}

function erropegarmsg(erro){
    console.log('erro ao pegar msg');
    console.log(erro);
    errototal();
}


function mostrarmsg(){
    const msgtotal = document.querySelector(".local-feed");
msgtotal.innerHTML = '';
for( let k = 0; k < localmsg.length; k++){
    let tamplate = `
    <li>
        ${localmsg[k].time}
    </li>
    `;
    msgtotal.innerHTML = msgtotal.innerHTML + tamplete;
}}

mostrarmsg();



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