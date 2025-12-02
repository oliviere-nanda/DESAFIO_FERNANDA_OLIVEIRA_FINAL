import { Component, OnInit } from '@angular/core';

class CarouselItem {
  constructor(
    public image: string,
    public title: string,
    public url: string
  ) {}
}

class CarouselController {
  static items: CarouselItem[] = [];
  index = 0;
  intervalMs = 4000;
  intervalId: any = null;

  container!: HTMLElement;
  titleDiv!: HTMLElement;

  constructor(intervalMs: number) {
    this.intervalMs = intervalMs;

    this.container = document.querySelector('#carousel') as HTMLElement;
    this.titleDiv = document.querySelector('#carousel-title') as HTMLElement;

    this.setupFallbackItems();
    this.addNavigationButtons();
    this.show(this.index);
  }

  setupFallbackItems() {
    CarouselController.items = [
      new CarouselItem('img/broncoSport.png', ' Verifique as novidades.', 'lancamento'),
      new CarouselItem('img/mustang.png', 'Verifique as novidades.', 'lancamento'),
      new CarouselItem('img/ranger.png', 'Verifique as novidades.', 'lancamento')
    ];
  }

  start() {
    this.intervalId = setInterval(() => this.next(), this.intervalMs);
  }

  stop() {
    clearInterval(this.intervalId);
  }

  next() {
    this.index = (this.index + 1) % CarouselController.items.length;
    this.show(this.index);
  }

  prev() {
    this.index = (this.index - 1 + CarouselController.items.length) % CarouselController.items.length;
    this.show(this.index);
  }

  show(idx: number) {
    const item = CarouselController.items[idx];

    this.container.style.backgroundImage = `url('${item.image}')`;
    this.container.style.backgroundSize = 'cover';
    this.container.style.backgroundPosition = 'center';

    this.titleDiv.innerHTML = `
      <a href="${item.url}" style="color:inherit; text-decoration:none;">
        ${item.title}
      </a>
    `;
  }

  addNavigationButtons() {
    const prevBtn = document.createElement('button');
    const nextBtn = document.createElement('button');

    prevBtn.textContent = '⬅';
    nextBtn.textContent = '➡';

    prevBtn.style.cssText = `
      position:absolute; top:50%; left:20px;
      transform:translateY(-50%);
      background:rgba(0,0,0,0.5); color:white;
      border:none; border-radius:50%;
      width:40px; height:40px; font-size:20px;
      cursor:pointer;
    `;

    nextBtn.style.cssText = `
      position:absolute; top:50%; right:20px;
      transform:translateY(-50%);
      background:rgba(0,0,0,0.5); color:white;
      border:none; border-radius:50%;
      width:40px; height:40px; font-size:20px;
      cursor:pointer;
    `;

    prevBtn.addEventListener('click', () => {
      this.stop();
      this.prev();
      this.start();
    });

    nextBtn.addEventListener('click', () => {
      this.stop();
      this.next();
      this.start();
    });

    this.container.style.position = 'relative';
    this.container.appendChild(prevBtn);
    this.container.appendChild(nextBtn);
  }
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carrossel.component.html',
  styleUrl: './carrossel.component.css'
})
export class CarouselComponent implements OnInit {

  private carousel!: CarouselController;

  ngOnInit() {
    setTimeout(() => {
      this.carousel = new CarouselController(4000);
      this.carousel.start();
    }, 0);
  }
}

