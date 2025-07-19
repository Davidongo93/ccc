import nodemailer from 'nodemailer';

// Define la interfaz para los datos del formulario
interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// Manejador de la solicitud POST
export async function POST(request: Request) {
  try {
    // Leemos los datos del cuerpo de la solicitud
    const { name, email, message }: ContactFormData = await request.json();

    // Validación de los campos
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ message: 'Todos los campos son obligatorios' }), {
        status: 400
      });
    }

    // Configuración de Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: email,
      to: 'cto@colombiancannabiscenter.com',
      subject: `Nuevo mensaje de website ccc. de ${name}`,
      text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`
    };

    // Enviamos el correo
    await transporter.sendMail(mailOptions);

    // Respondemos con éxito
    return new Response(JSON.stringify({ message: 'Mensaje enviado correctamente' }), {
      status: 200
    });
  } catch (error) {
    console.error('Error enviando el email:', error);
    return new Response(JSON.stringify({ message: 'Error al enviar el mensaje' }), { status: 500 });
  }
}
