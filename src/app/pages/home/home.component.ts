import { Component, OnInit, HostListener, AfterViewInit, OnDestroy } from '@angular/core';
import * as AOS from 'aos';
import { ProyectosCompComponent } from "../../componentes/proyectos-comp/proyectos-comp.component";
import { AcercaCompComponent } from "../../componentes/acerca-comp/acerca-comp.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [ProyectosCompComponent, AcercaCompComponent]
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

  ngOnInit(): void {
    this.initializeAOS();
  }

  ngAfterViewInit(): void {
    window.addEventListener('load', AOS.refresh);
    this.initTypeEffect();
    this.setupBackToTopButton();
  }

  ngOnDestroy(): void {
    window.removeEventListener('load', AOS.refresh);
    this.cleanupBackToTopButton();
  }

  private initializeAOS(): void {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out-quart',
      once: true,
      mirror: false,
      offset: 120,
      anchorPlacement: 'top-bottom'
    });

    setTimeout(() => {
      AOS.refreshHard();
    }, 500);
  }

  private async initTypeEffect(): Promise<void> {
    const node = document.querySelector("#type-text") as HTMLElement;

    if (!node) return;

    await this.sleep(1000);
    node.innerText = "";
    await this.typeText(node, 'Digitales\u00A0');

    while (true) {
      await this.typeText(node, '¡Divertidas!');
      await this.sleep(2000);
      await this.deleteText(node, '¡Divertidas!');
      await this.typeText(node, '¡Creativas!');
      await this.sleep(2000);
      await this.deleteText(node, '¡Creativas!');
      await this.typeText(node, '¡Únicas!');
      await this.sleep(2000);
      await this.deleteText(node, '¡Únicas!');
    }
  }

  private sleep(time: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  private async typeText(element: HTMLElement, text: string): Promise<void> {
    for (let character of text) {
      element.innerText += character;
      await this.sleep(this.getRandomTypeInterval());
    }
  }

  private async deleteText(element: HTMLElement, text: string): Promise<void> {
    for (let character of text) {
      element.innerText = element.innerText.slice(0, element.innerText.length - 1);
      await this.sleep(this.getRandomTypeInterval());
    }
  }

  private getRandomTypeInterval(): number {
    const randomMs = 100 * Math.random();
    return randomMs < 50 ? 10 : randomMs;
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.toggleBackToTopButton();
  }

  private toggleBackToTopButton(): void {
    const backToTopButton = document.querySelector('.back-to-top');
    if (window.scrollY > 300) {
      backToTopButton?.classList.add('active');
    } else {
      backToTopButton?.classList.remove('active');
    }
  }

  private setupBackToTopButton(): void {
    const backToTopButton = document.querySelector('.back-to-top');
    backToTopButton?.addEventListener('click', () => this.scrollToTop());
  }

  private cleanupBackToTopButton(): void {
    const backToTopButton = document.querySelector('.back-to-top');
    backToTopButton?.removeEventListener('click', () => this.scrollToTop());
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}