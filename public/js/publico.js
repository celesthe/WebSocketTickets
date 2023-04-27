const lblticket1           = document.querySelector('#lblTicket1');
const lblEscritorio1    = document.querySelector('#lblEscritorio1');
const lblticket2           = document.querySelector('#lblTicket2');
const lblEscritorio2    = document.querySelector('#lblEscritorio2');
const lblticket3           = document.querySelector('#lblTicket3');
const lblEscritorio3    = document.querySelector('#lblEscritorio3');
const lblticket4           = document.querySelector('#lblTicket4');
const lblEscritorio4    = document.querySelector('#lblEscritorio4');

const socket = io();


socket.on('estado-actual', (payload) => {
    const audio = new Audio('./audio/new-ticket.mp3');
    audio.play();
    
    console.log(payload);
   const [ticket1, ticket2, ticket3, ticket4] = payload;

   if(lblEscritorio1){
    lblEscritorio1.innerText = ticket1.escritorio;
    lblticket1.innerText  = 'Ticket ' + ticket1.numero;
   }
  
   if(lblEscritorio2){
    lblEscritorio2.innerText = ticket2.escritorio;
    lblticket2.innerText  = 'Ticket ' + ticket2.numero;
   }
  
   if(lblEscritorio3){
    lblEscritorio3.innerText = ticket3.escritorio;
   lblticket3.innerText  = 'Ticket ' + ticket3.numero;
   }
   
   if(lblEscritorio4){
    lblEscritorio4.innerText = ticket4.escritorio;
   lblticket4.innerText  = 'Ticket ' + ticket4.numero;
   }
   
    


});


// btnCrear.addEventListener( 'click', () => {
    
//     socket.emit( 'siguiente-ticket', null, ( ticket ) => {
//         lblNuevoTicket.innerText = ticket;
//         console.log('Desde el server', ticket );
//     });

// });