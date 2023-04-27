const lblEscritorio = document.querySelector('h1');
const btnAtender = document.querySelector('button');
const lblTicket = document.querySelector('small');
const divAlerta = document.querySelector('.alert');
const lblpendientes = document.querySelector('#lblPendientes');

const searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('escritorio')){
window.location = 'index.html';
throw new Error('El escritorio es obligatorio');
}


const escritorio = searchParams.get('escritorio');
lblEscritorio.innerText = escritorio;
divAlerta.style.display = 'none';

const socket = io();



socket.on('connect', () => {
    // console.log('Conectado');

    btnAtender.disabled = false;


});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');

    btnAtender.disabled = true;
});

socket.on('ultimo-ticket', (ultimoTicket) => {
    //lblNuevoTicket.innerText = 'Ticket ' + ultimoTicket;
})

socket.on('ticket-cola', (ticketCola) => {
    if(ticketCola === 0){
        lblpendientes.innerText = 0;
        divAlerta.style.display = '';
        
    }
    else
    {
        lblpendientes.innerText = ticketCola;
        divAlerta.style.display = 'none';

    }
    //lblpendientes.innerText = ticketCola;

})


btnAtender.addEventListener( 'click', () => {
    socket.emit('atender-ticket', {escritorio}, ({ok, ticket, msg}) => {
      
        if(!ok){
            lblTicket.innerText = 'Nadie. ';
            return divAlerta.style.display = '';
        }
       
        lblTicket.innerText = 'Ticket ' + ticket.numero;
    });
    
    // socket.emit( 'siguiente-ticket', null, ( ticket ) => {
    //     lblNuevoTicket.innerText = ticket;
    //     console.log('Desde el server', ticket );
    // });

});