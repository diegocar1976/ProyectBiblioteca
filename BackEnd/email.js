const nodemailer = require('nodemailer');
const { generatePDF } = require('../BackEnd/generarpdf.js'); // Importa la funciÃ³n de generaciÃ³n de PDF
const path = require('path'); // Importa el mÃ³dulo 'path' de Node.js

// ConfiguraciÃ³n de nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // Por ejemplo, 'Gmail'
  auth: {
    user: "bibliotecautng1975@gmail.com",
    pass: "piofgmqxyiachyzs",
  },
});

// FunciÃ³n para enviar el correo con el PDF adjunto
const sendEmailWithPDF = async (prestamoData) => {
  // Genera el PDF y obtÃ©n su ruta
  const pdfPath = generatePDF(prestamoData);

  const mailOptions = {
    from: "bibliotecautng1975@gmail.com",
    to: prestamoData.correo,
    subject: 'Aviso Importante: Retraso en Devolución de Material Bibliográfico',
    html: `
        <p>Estimado(a) alumno con identificador ${prestamoData.numControl},</p>
        <p>Esperamos que este mensaje le encuentre bien.</p>
        <p>Le informamos que su préstamo de material bibliográfico con los siguientes detalles:</p>
        <ul>
            <li>Número de control: ${prestamoData.numControl}</li>
            <li>ISBN: ${prestamoData.ISBN}</li>
            <li>ID Ejemplar: ${prestamoData.idEjemplar}</li>
            <li>Fecha de préstamo: ${prestamoData.fechaPrestamo}</li>
            <li>Fecha de devolución: ${prestamoData.fechaDevolucion}</li>
        </ul>
        <p>Ha vencido y lamentablemente no ha sido devuelto en la fecha acordada. Por este motivo, se aplicará una sanción por el retraso en la devolución.</p>
        <p>Por favor, pase por nuestra biblioteca para regularizar su situación y evitar mayores inconvenientes.</p>
        <p>Gracias por su cooperación y comprensión.</p>
        <p>Atentamente,</p>
        <p>Nombre del Remitente</p>
        <p>Biblioteca UTNG</p>
    `,
    attachments: [
        {
            filename: 'prestamo.pdf',
            path: pdfPath, // Usa la ruta del archivo PDF en lugar del contenido
        },
    ],
};


  try {
    await transporter.sendMail(mailOptions);
    console.log('Correo enviado con Exito');
  } catch (error) {
    console.error('Error al enviar el correo:', error);
  }
};

module.exports = { sendEmailWithPDF };