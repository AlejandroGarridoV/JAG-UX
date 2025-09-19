import { Component } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-formulario-contacto',
  templateUrl: './formulario-contacto.component.html',
  styleUrls: ['./formulario-contacto.component.css']
})
export class FormularioContactoComponent {
  public sendEmail(e: Event) {
    e.preventDefault();
    emailjs.sendForm('service_3v8p656', 'template_lxi1dlj', e.target as HTMLFormElement, {
      publicKey: '3BDyoUrX2gmge_8Zz',
    })
    .then(() => alert('✅ Message sent successfully!'))
    .catch((error: EmailJSResponseStatus) => {
      console.error('FAILED...', error.text);
      alert('❌ An error occurred, please try again.');
    });
  }
}
