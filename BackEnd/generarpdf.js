var fonts = {
	Roboto: {
		normal: 'fonts/Roboto-Regular.ttf',
		bold: 'fonts/Roboto-Medium.ttf',
		italics: 'fonts/Roboto-Italic.ttf',
		bolditalics: 'fonts/Roboto-MediumItalic.ttf'
	}
};

var PdfPrinter = require('pdfmake');
var printer = new PdfPrinter(fonts);
var fs = require('fs');

// FunciÃ³n para generar una referencia de pago
function generarReferenciaDePago() {
  // Genera un nÃºmero de referencia aleatorio (simulado)
  const numeroReferencia = Math.floor(Math.random() * 1000000);

  // Formato de la referencia (puedes personalizarlo segÃºn tus necesidades)
  const referenciaFormateada = `REF-${numeroReferencia}`;

  return referenciaFormateada;
}


const generatePDF = (prestamoData) => {

  // Ejemplo de uso
const referenciaPago = generarReferenciaDePago();

  var estiloNegrita = { bold: true };

  var docDefinition = {
    content: [
        {
            image: 'imagenes/logo.png',
            width: 100,
            alignment: 'right',
            margin: [0, 10]
        },
        {
            text: 'Universidad Tecnológica del Norte de Guanajuato',
            style: 'header',
            alignment: 'center',
            margin: [0, 10]
        },
        {
            text: 'Detalles del préstamo',
            style: 'subheader',
            alignment: 'center',
            margin: [0, 10]
        },
        {
            columns: [
                {
                    text: `Número de control: ${prestamoData.numControl}`,
                    margin: [0, 5]
                },
                {
                    text: `ISBN: ${prestamoData.ISBN}`,
                    margin: [0, 5]
                }
            ]
        },
        {
            columns: [
                {
                    text: `ID Ejemplar: ${prestamoData.idEjemplar}`,
                    margin: [0, 5]
                },
                {
                    text: `Monto: $5 `,
                    margin: [0, 5]
                }
            ]
        },
        {
            text: `Fecha de préstamo: ${prestamoData.fechaPrestamo}`,
            margin: [0, 5]
        },
        {
            text: `Fecha de devolución: ${prestamoData.fechaDevolucion}`,
            margin: [0, 5]
        },
        {
            text: `Referencia de pago: ${referenciaPago}`,
            margin: [0, 5]
        }
    ],
    styles: {
        header: {
            fontSize: 24,
            bold: true,
            color: '#007bff' // Color azul
        },
        subheader: {
            fontSize: 18,
            bold: true,
            margin: [0, 10]
        }
    }
};


  var pdfDoc = printer.createPdfKitDocument(docDefinition);
  pdfDoc.pipe(fs.createWriteStream('pdfs/prestamo.pdf'));
  pdfDoc.end();

  return pdfDocRuta = "pdfs/prestamo.pdf";
};

module.exports = { generatePDF };