const TicketControl = require('../models/ticket-control');
const ticketControl = new TicketControl();


const socketController = (socket) => {
    
    // console.log('Cliente conectado', socket.id );

    // socket.on('disconnect', () => {
    //     console.log('Cliente desconectado', socket.id );
    // });

    // socket.on('enviar-mensaje', ( payload, callback ) => {
        
    //     const id = 123456789;
    //     callback( id );

    //     socket.broadcast.emit('enviar-mensaje', payload );

    // })
    socket.emit('ultimo-ticket', ticketControl.ultimo);
    
    socket.emit('estado-actual', ticketControl.ultimos4);
    socket.emit('ticket-cola', ticketControl.tickets.length);

    socket.broadcast.emit('ticket-cola', ticketControl.tickets.length);
    socket.on('siguiente-ticket', ( payload, callback ) => {
        const siguiente = ticketControl.siguiente();
        socket.broadcast.emit('ticket-cola', ticketControl.tickets.length);
        socket.emit('ticket-cola', ticketControl.tickets.length);
        callback( siguiente);
    });

    socket.on('atender-ticket', ( {escritorio}, callback ) => {
        if(!escritorio){
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio'
            });
        }
    const ticket = ticketControl.atenderTicket(escritorio);
    socket.broadcast.emit('estado-actual', ticketControl.ultimos4);
    socket.emit('ticket-cola', ticketControl.tickets.length);
    socket.broadcast.emit('ticket-cola', ticketControl.tickets.length);
    //TODO Notificar cambios en los ultimos 4
        if(!ticket){
            return callback({
                ok: false,
                msg: 'Ya no hay tickets'
            });
        }else{
            callback({
                ok: true,
                ticket
            });
        }
    });

}



module.exports = {
    socketController
}

